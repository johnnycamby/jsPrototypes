
var path = require('path');
var _ = require('lodash');
var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')(); // the '()' are for executing the function
var del = require('del');
var plumber = require('gulp-plumber');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({lazy: true});

var port = process.env.PORT || config.defaultPort;

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);


//var jshint = require('gulp-jshint');
//var jscs = require('gulp-jscs');
//var util = require('gulp-util');
//var gulpprint = require('gulp-print');
//var gulpif = require('gulp-if');



gulp.task('vet', function () {
	
	log('--------------- Analyzing source with JSHint and JSCS ------------------------------------');
    
	return gulp.src(config.alljs)
	
	//.pipe(gulpif(args.verbose, gulpprint())) // 'gulp vet --verbose' on cmd-prompt
	//.pipe(jscs())
	//.pipe(jshint())
	//.pipe(jshint.reporter('jshint-stylish', {verbose: true}))
	//.pipe(jshint.reporter('fail')); // for CI - process (Continuous integration ).
	
	.pipe($.if(args.verbose, $.print())) 
	.pipe($.jscs())
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
	.pipe($.jshint.reporter('fail')); // for CI - process (Continuous integration ).
});

// this task depends on 'clean-styles' thus runs after 'clean-styles' task
gulp.task('styles', ['clean-styles'], function(){
	
	log('------------- Compiling Less --> css ------------------------------------------------------');
	
	return gulp.src(config.less)
	.pipe($.plumber()) // handle errors
	.pipe($.less())	
	.pipe($.autoprefixer({browsers: ['last 2 version', '> 5%'] }))
	.pipe(gulp.dest(config.temp));
	
});

gulp.task('clean-code', function(){
	
	var files = [].concat(
		config.temp + '**/*.js',
		config.build + '**/*.html',
		config.build + 'js/**/*.js'		
	);
	
	clean(files);
	
});

gulp.task('fonts', ['clean-fonts'], function(){
	
	log('--------------------- Copying fonts -----------------------------------------------------');
	
	return gulp.src(config.fonts)
	.pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function(){
	
	log('------------------- Copying and compressing images ---------------------------------------');
	
	return gulp.src(config.images)
	.pipe($.imagemin({optimizationLevel: 4}))
	.pipe(gulp.dest(config.build + 'images'));
});

gulp.task('clean', function(){	
	
	var delConfig = [].concat(config.build, config.temp);
	log('------------------ Cleaning: ' + $.util.colors.blue(delConfig) + '----------------------');
	del(delConfig);	
});

gulp.task('clean-fonts', function(){	
	clean(config.build + 'fonts/**/*.*');
});

gulp.task('clean-images', function(){
	clean(config.build + 'images/**/*.*');
});

gulp.task('clean-styles', function(){
	clean(config.temp + '**/*.css');
});

gulp.task('less-watcher', function(){
	gulp.watch([config.less], ['styles']);
});

gulp.task('templatecache', ['clean-code'], function(){
	
	log('----------------------- Creating AngularJs $templateCache --------------------------------');
	
	return gulp.src(config.htmltemplates)
	.pipe($.minifyHtml({empty: true}))
	.pipe($.angularTemplatecache(config.templateCache.file, config.templateCache.options))
	.pipe(gulp.dest(config.temp));
	
});

gulp.task('wiredep', function(){
	
	log('------------ Wire up the bower css, js and app js into the html -------------------------- ');
	var options = config.getWiredepDefaultOptions();
	
	return gulp.src(config.index)
	.pipe(wiredep(options))
	.pipe($.inject(gulp.src(config.js)))
	.pipe(gulp.dest(config.client));
	
});

gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function(){
	
	log('------------ Wire up the app css into the html and call wiredep -------------------------- ');
		
	return gulp.src(config.index)
	.pipe($.inject(gulp.src(config.css)))
	.pipe(gulp.dest(config.client));
	
});

gulp.task('build', ['optimize' , 'fonts', 'images'], function(){
	
	log('------------------------ Building everything --------------------------------------------');
	
	var msg = {
		title: 'gulp build',
		subtitle: 'Deployed to the build folder',
		message: 'Running `gulp server-build`'
	};
	
	del(config.temp);
	log(msg);
	notify(msg);
});

gulp.task('serve-specs', ['build-specs'], function(done){
	log('------------------ running spec runner -----------------------------------------------------');
	
	serve(true,/* isDev*/ true /* specRunner*/ );
	done();
});

gulp.task('build-specs',['templatecache'], function(){
	
	log('--------------------- building the spec runner ---------------------------------------------');
	
	var wiredep = require('wiredep').stream;
	var options = config.getWiredepDefaultOptions();
	var specs = config.specs;
	
	options.devDependencies = true;
	
	if(args.startServers){
		
		specs = [].concat(specs, config.serverIntegrationSpecs);
	}
	
	return gulp.src(config.specRunner)
	.pipe(wiredep(options))
	.pipe($.inject(gulp.src(config.testLibraries, {read: false}), {name: 'inject:testlibraries'}))
	.pipe($.inject(gulp.src(config.js)))
	.pipe($.inject(gulp.src(config.specHelpers , {read: false}), {name: 'inject:spechelpers'}))
	.pipe($.inject(gulp.src(specs , {read: false}), {name: 'inject:specs'}))
	.pipe($.inject(gulp.src(config.temp + config.templateCache.file , {read: false}), {name: 'inject:templates'}))
	.pipe(gulp.dest(config.client));
	
});

// optimize ur web page
gulp.task('optimize', ['inject', 'test'], function(){
	
	log('------------------ Optimize the javascript , css, html ----------------------------------');
	
	var templateCache = config.temp + config.templateCache.file;
	var assets = $.useref.assets({searchPath: './'});
	var cssFilter = $.filter('**/*.css');
	var jsLibFilter = $.filter('**/' + config.optimized.lib);
	var jsAppFilter = $.filter('**/' + config.optimized.app);
	
	
	return gulp.src(config.index)
	.pipe($.plumber())
	.pipe($.inject(gulp.src(templateCache, {read: false}), {starttag: '<!-- inject:templates:js -->'}))
	.pipe(assets)
	.pipe(cssFilter)
	.pipe($.csso())
	.pipe(cssFilter.restore())
	.pipe(jsLibFilter)
	.pipe($.uglify())
	.pipe(jsLibFilter.restore())
	.pipe(jsAppFilter)
	.pipe($.ngAnnotate())
	.pipe($.uglify())
	.pipe(jsAppFilter.restore())
	.pipe($.rev()) // rename a file say app.js --> app-1.js
	.pipe(assets.restore())
	.pipe($.useref())
	.pipe($.revReplace())
	.pipe(gulp.dest(config.build))
	.pipe($.rev.manifest())
	.pipe(gulp.dest(config.build));
	
	
});

/*
 ----------------- Bump Version ------------------
 - type=pre         : will bump the prerelease version *.*.*-x
 - type=patch or no : will bump the patch version *.*.x
 - type=minor       : will bump the minor version *.x.*
 - type=major       : will bump the major version x.*.*
 - version=1.2.3    : will bump to a specific verion and ignore other flags
*/
gulp.task('bump', function(){
	var message = 'Bumping versions';
	var type = args.type;
	var version = args.version;
	
	var options = {};
	
	if(version){
		options.version = version;
		message += ' to ' + version;
	}else{
		options.type = type;
		message += ' for a ' + type;
	}
	
	log(message);
	
	return gulp.src(config.packages)
	.pipe($.print())
	.pipe($.bump(options))
	.pipe(gulp.dest(config.root));
});

gulp.task('serve-build',['build'], function(){	
	serve(false);
});

gulp.task('serve-dev', ['inject'], function(){	
	serve(true);
});

// tests
gulp.task('test',['vet', 'templatecache'], function(done){
	
	startTests(true,done);
});

// testing on code change
gulp.task('autotest',['vet', 'templatecache'], function(done){
	
	startTests(false, done);
});

function serve (isDev, specRunner){
		
	var nodeOptions = {
		
		script: config.nodeServer,
		delayTime: 1,
		env: {
			'PORT' : port,
			'NODE_ENV': isDev ? 'dev' : 'build'
		}, 
		watch: [config.server]
		
	};
	
   return $.nodemon(nodeOptions)   
   .on('restart', ['vet'], function(evt){
	   log('----------------------- nodemon restarted --------------------------------------------- ');
	   log('---------------------- files changed on restart:\n' + evt + ' ------------------------');
	   
	   setTimeout(function(){
		   browserSync.notify('reloading now ...');
		   browserSync.reload({stream: false});		   
	   }, config.browserReloadDelay);
   })
   .on('start', function(){
	   log('--------------------- nodemon started -----------------------------------------------');
	   startBrowserSync(isDev, specRunner);
   })
   .on('crash', function(){
	   log('-------------------- nodemon crashed: script crashed for some reason -----------------');
   })
   .on('exit', function(){
	   log('------------------- nodemon exited cleanly -------------------------------------------');
   });
	
}

function changeEvent(event){
	
	var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
	log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function notify(options){
	
	var notifier = require('node-notifier');
	var notifyOptions = {
		sound: 'Bottle',
		contentImage: path.join(__dirname, 'gulp.png'),
		icon: path.join(__dirname, 'gulp.png')
	};
	
	_.assign(notifyOptions, options);
	notifier.notify(notifyOptions);
	
}

function startBrowserSync(isDev, specRunner){
	
	if(args.nosync || browserSync.active){
		return;
	}
	
	log('---------------------------- Starting browser-sync on port: ' + port + ' -----------------');

	if(isDev){
		
		gulp.watch([config.less], ['styles']).on('change', function(event){
		changeEvent(event);
	});
	}else{
		
		gulp.watch([config.less, config.js, config.html], ['optimize',browserSync.reload]).on('change', function(event){
		changeEvent(event);
	});
	}
	
	
	var options = {
		proxy: 'localhost:' + port,
		port: 3000, // browse to using browser-sync
		files: isDev ? [config.client + '**/*.*', '!' + config.less, config.temp + '**/*.css'] : [],
		ghostMode:{
			clicks: true,
			location:false,
			forms: true,
			scroll: true
		},
		injectChanges: true,
		logFileChanges: true,
		logLevel: 'debug',
		logPrefix:'gulp-patterns',
		notify: true,
		reloadDelay: 0
	};
	
	if(specRunner){
		options.startPath = config.specRunnerFile;
	}
	
	browserSync(options);
}

function startTests(singleRun, done){
	
	var child;
	var fork = require('child_process').fork;
	var karma = require('karma').server;
	var excludeFiles = [];
	var serverSpecs = config.serverIntegrationSpecs;
	
	if(args.startServers){ // gulp test --startServers
		
		log('Starting server');
		
		var savedEnv = process.env;
		savedEnv.NODE_ENV = 'dev';
		savedEnv.PORT = 8888;
		
		child = fork(config.nodeServer);
		
	}else{
		
		if(serverSpecs && serverSpecs.length){
			excludeFiles = serverSpecs;
		}
		
	}
	
	karma.start({
		configFile: __dirname + '/karma.conf.js',
		exclude: excludeFiles,
		singleRun: !!singleRun
	}, karmaCompleted);
	
	function karmaCompleted(karmaResult){
		
		log('---------------- Karma completed ---------------------------------------------------');
		
		if(child){
			log('Shutting down child process');
			child.kill();
		}
		
		if(karmaResult === 1){
			done('Karma: tests failed with code ' + karmaResult);
		}else{
			done();
		}
		
	}
	
}

function clean(path){
	log('-------------- Cleaning: ' +  $.util.colors.blue(path) + ' -------------------------------');
	del(path);
}

function log(msg){
	
	if(typeof(msg) === 'object'){
		for(var item in msg){
			if(msg.hasOwnProperty(item)){
				//util.log(util.colors.blue(msg[item]));
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	}else{
		$.util.log($.util.colors.blue(msg));
	}
	
}