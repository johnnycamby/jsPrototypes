
var mongoose = require('mongoose'),
    chatModel = require('../models/Chat.js');

exports.dbConfig = function (config) {
    
    mongoose.connect(config.db);
    
    var db = mongoose.Connection;
    
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('db opened');
    });
    
    chatModel.createDefaultChats();

};