
var mongoose = require('mongoose');
//var encrypt = require('../utils/encryption');

var chatSchema = mongoose.Schema(
    {
        username: { type: String, require: '{PATH} is required!', unique: true },
        text: { type: String, require: '{PATH} is required!' },
        date: { type: Date, require: '{PATH} is required!' },
    });

var Chat = mongoose.model('Chat', chatSchema);

exports.createDefaultChats = function() {
    
    Chat.find({}).exec(function (err, collection) {
        
        if (collection.length === 0) {
            Chat.create({ username: 'johnnycamby', text: 'Changed to include date stamps in the log', date: '2015-07-31T15:53:59.254Z' });
            Chat.create({ username: "benjohnson", text: "Change", date: "2015-07-31T16:02:08.964Z" });
            Chat.create({ username: "xplicit4548", text: "something", date: "2015-07-31T16:02:10.243Z" });
        }
    });
};