/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var config = require('../services/config.js');

module.exports = {

    // endpoint(s)-action
    tweet: function(req, res){

        User.findOne(req.userId, function(err, user){

            var message = req.body.message;
            var datetime = req.body.scheduledfor;

            Post.create({
                message: message,
                scheduledfor:datetime,
                owner:req.userId
            }).exec(function(err, post){
                console.log('it works!!', post, err);
                res.status(200).end();
            })


        })
    },

    clientPosts: function(req, res){

        // search post(s) that match a particular userId
        Post.find({
            owner: req.userId
        }, function(err, ports){

            res.json(ports);
        })

    }
};

