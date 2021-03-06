/**
 * Created by johnny on 3/10/2015.
 */


var Twit = require('twit');
var sails = require('sails');

sails.load(function(){
    checkPosts();
})

function checkPosts(){
    Post.find().where(
        {
            scheduledfor: {
                '<' : new Date()
            }
        })
        .populate('owner')
        .exec(function(err, posts){
            console.log(posts);

            posts.forEach(function(post){
                sendTweet(post.owner.twitterToken, post.owner.twitterSecret, post.message);
            })

    })
}

function sendTweet(token, secret, message){

    var T = new Twit({
        consumer_key:    config.TWITTER_KEY,
        consumer_secret:  config.TWITTER_SECRET,
        access_token: token,
        access_token_secret: secret
    })

    T.post('statuses/update',
        {
            status: message
        }, function(err, data, response) {
            console.log("Sent successfully",err);
        })

}
/*
setInterval(function(){

    console.log('Hey men');
}, 1000);
    */