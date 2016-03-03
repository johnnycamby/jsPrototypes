/**
 * Created by johnny on 3/9/2015.
 */

var gulp = require('gulp');
var webServer = require('gulp-webserver');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var del = require('del');

var paths = {

    temp:'temp',
    tempVendor:'temp/vendor',
    tempIndex: 'temp/index.html',

    index:'app/index.html',
    appSrc: ['app/**/*', '!app/index.html'],
    bowerSrc:'vendors/**/*'
};

gulp.task('default', ['watch']);

gulp.task('watch',['serve'], function(){
    gulp.watch(paths.appSrc, ['scripts']);
    gulp.watch(paths.bowerSrc, ['vendors']);
    gulp.watch(paths.index, ['copyAll']);

});

gulp.task('serve',['copyAll'], function(){
    // serve the entire root-directory
    gulp.src(paths.temp)
        .pipe(webServer({
           open: true, // browser open with gulp task
            // directoryListing: true,
            livereload:true,
            proxies:[{
                source:'/api',
                target:'http://localhost:1337'
            }]
        }));
});

gulp.task('copyAll', function(){

    var tempVendors = gulp.src(mainBowerFiles())
        .pipe(gulp.dest(paths.tempVendor));

    var appScripts = gulp.src(paths.appSrc)
        .pipe(gulp.dest(paths.temp));

    return gulp.src(paths.index)
        .pipe(gulp.dest(paths.temp)) // copy the index.html into temp folder
        .pipe(inject(tempVendors, {
            relative: true,
            name: 'vendorInject'
        }))
        .pipe(inject(appScripts, {
        relative: true
        }))
        .pipe(gulp.dest(paths.temp));


})

gulp.task('vendors',function(){

    var tempVendors = gulp.src(mainBowerFiles())
        .pipe(gulp.dest(paths.tempVendor));

    return gulp.src(paths.tempIndex)
        .pipe(inject(tempVendors, {
            relative: true,
            name: 'vendorInject'
        }))
        .pipe(gulp.dest(paths.temp));
});

gulp.task('scripts', function(){

    var appScripts = gulp.src(paths.appSrc)
        .pipe(gulp.dest(paths.temp));

    return gulp.src(paths.tempIndex)
        .pipe(inject(appScripts, {
        relative: true
        }))
        .pipe(gulp.dest(paths.temp));

});

gulp.task('clean', function(){
    del([paths.temp]);
});