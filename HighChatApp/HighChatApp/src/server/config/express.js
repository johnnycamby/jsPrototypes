

var express = require('express'),
    stylus = require('stylus');

exports.fileDir = function (app, config) {
    
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.configure(function () {
        app.use(express.logger('dev'));
        app.use(stylus.middleware(
            {
                src: config.rootPath + '/public',
                compile: compile
            }
        ));
        app.use(express.static(config.rootPath + '/public'));
    });
}
