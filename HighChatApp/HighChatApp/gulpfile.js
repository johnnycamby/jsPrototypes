
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');


gulp.task('serve', function () {
    
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        }
    }

    return nodemon(options).on('restart', function (ev) {
        console.log('Restarting...');
    });
});
