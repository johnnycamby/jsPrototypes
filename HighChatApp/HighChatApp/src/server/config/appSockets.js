
var express = require('express');
var socketio = require('socket.io');
var path = require('path');
var http = require('http');
var async = require('async');


var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));

var messages = [];
var sockets = [];

io.on('connect', function (socket) {
    
    messages.forEach(function (data) {
        socket.emit('message', data);
    });
    
    sockets.push(socket);
    
    socket.on('disconnect', function () {
        
        sockets.splice(sockets.indexOf(socket), 1);
        updateRoster();
    });
    
    socket.on('message', function (msg) {
        
        var text = String(msg || '');
        
        if (!text)
            return;
        
        var d = new Date();
        
        socket.get('username', function (err, username) {
            
            var data = {
                name: name,
                text: text,
                date: d
            };
            
            var trendData = {
                date: d,
                count: '1'
            };
            
            broadcast('message', data);
            messages.push(data);
            
            logData(data, 'message.json');
            logData(trendData, 'trend.json');
            
            postData('data=' + JSON.stringify(data), '');
        });
    });
    
    socket.on('identify', function (username) {
        socket.set('username', String(username || 'Anonymous'), function (err) {
            updateRoster();
        });
    });
});

function updateRoster() {
    async.map(sockets, function (socket, callback) {
        socket.get('name', callback);
    }, function (err, names) {
        broadcast('roster', names);
    }
    );
}

function broadcast(evt , data) {
    sockets.forEach(function (socket) {
        socket.emit(evt, data);
    });
}

function logData(data, file) {
    
    var fs = require('fs');
    
    fs.appendFile(file, JSON.stringify(data) + "\n" , function (err) {
        if (err)
            throw err;
        console.log(JSON.stringify(data) + ' was appended to file');
    });
}

function postData(data , postUrl) {
    
    var request = require('request');
    
    // Set the headers 
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    var options = {
        url: postUrl,
        method: 'POST',
        headers: headers,
        form: data
    }
    
    request(options, function (error, response, body) {
        
        if (!error && response.statusCode == 200) {
            console.log(body);
        } else {
            console.log(error);
        }
    });
}

exports.server = server;

//exports.appSocket = {
//    server: server
//};

//var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//var config = require('./config')[env];

//server.listen(config.port, process.env.IP, function () {
    
//    var addr = server.address();
//    console.log('---------- Server listening at :  ' + addr.address + ' : ' + config.port + ' --------------------------------');

//});