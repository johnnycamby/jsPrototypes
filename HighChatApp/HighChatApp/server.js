

var express = require('express');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'; 

var app = express();
var config = require('./src/server/config/config')[env];
//require('./src/server/config/express')(app, config);
//require('./src/server/config/mongoose')(config);
var appSocket = require('./src/server/config/appSockets');

appSocket.server.listen(config.port, function () { 

    console.log('---------- Server listening at :  '+ config.port + ' --------------------------------');

});




