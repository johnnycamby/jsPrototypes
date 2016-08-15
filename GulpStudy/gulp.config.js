
module.exports = function(){
	
	var client = './src/client/';
	var clientApp = client +  'app/';
	var temp = './.tmp/';
	var server = './src/server/';
	var root = './';
	var report = './report/';
	var wiredep = require('wiredep');
	var bowerFiles = wiredep({devDependencies: true})['js'];
	var specRunnerFile = 'specs.html';
	
	var config = {		
		
		// all js to vet
		alljs: [ './src/**/*.js', './*.js' ],
		build: './build/', 
		client: client,
		css: temp + 'styles.css',
		fonts: './bower_components/font-awesome/fonts/**/*.*',
		htmltemplates: clientApp +  '**/*.html',
		images: client + 'images/**/*.*',
		index: client + 'index.html',
		js: [ clientApp +  '**/*.module.js', clientApp + '**/*.js', '!' + clientApp + '**/*.spec.js'  ],
		
		less: client + 'styles/styles.less',
		html: clientApp +  '**/*.html',
		root: root,
		report: report,
		server: server,
		temp: temp,
		optimized: {
			app:'app.js',
			lib:'lib.js'
		},
		templateCache: {
			file: 'templates.js',
			options:{
				module: 'app.core',
				standAlone: false,
				root: 'app/'
			}
		},
		browserReloadDelay: 1000,
		
		// bower npm locaations
		bower: {
			json: require('./bower.json'),
			directory: './bower_components/',
			ignorePath: '../..'
		},
		
		packages:['./package.json', './bower.json'],
		
		// spec.html 
		specRunner: client + specRunnerFile,
		specRunnerFile: specRunnerFile,
		testLibraries: [
			'node_modules/mocha/mocha.js',
			'node_modules/chai/chai.js',
			'node_modules/mocha-clean/index.js',
			'node_modules/sinon-chai/lib/sinon-chai.js'
		],
		
		specs: [clientApp + '**/*.spec.js'],
		
		// karma and testing settings
		specHelpers: [client + 'test-helpers/*.js'],
		serverIntegrationSpecs:[client + 'tests/server-integration/**/*.spec.js'],
		defaultPort: 7203,
		nodeServer: './src/server/app.js'
	};
	
	config.getWiredepDefaultOptions = function (){
		
		var options = {
			bowerJson: config.bower.json,
			directory: config.bower.directory,
			ignorePath: config.bower.ignorePath
		};
		
		return options;
	};
	
	
	config.karma = getKarmaOptions();
	
	return config;
	
	function getKarmaOptions(){
		
		var options = {
			
			files: [].concat(
				bowerFiles,
				config.specHelpers, 
				client + '**/*.module.js',
				client + '**/*.js',
				temp + config.templateCache.file,
				config.serverIntegrationSpecs
			),
			exclude:[],
			coverage: {
				dir: report + 'coverage',
				reporters:[
					{type:'html', subdir: 'report-html'},
					{type:'lcov', subdir: 'report-lcov'},
					{type:'text-summary'}
					
				]
			},
			preprocessors:{}
			
		};
		
		options.preprocessors[clientApp + '**/!(*.spec)+(js)'] = ['coverage'];
		
		return options;
	}
		
};

