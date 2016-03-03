
var friends = [
    { id: 1, name: "James", about: "funny" },
    { id: 2, name: "Jacob", about: "to smart" },
    { id: 3, name: "Tom", about: "owesome" }
];

window.StudyEmber = Ember.Application.create({
    rootElement: '#studyEmber',
    LOG_TRANSITIONS: true
});

StudyEmber.Router.map(function() {

    this.route('about'); // AboutRoute, AboutController, AboutView, AboutTemplate
    this.route('contact');

    /*
     * - A resource can have sub-routes and sub-resources
     */
    this.resource('friends', function() {
        //this.resource('issues');
        this.route('issues');
        this.route('about', { path: '/:friend_id/about' });
    });
});

StudyEmber.FriendsAboutRoute = Ember.Route.extend({
    model: function (params) {
        return friends.findBy('id', parseInt(params.friend_id));
      }
});

StudyEmber.FriendsRoute = Ember.Route.extend({
    model: function() {
        return friends;
    }
});

StudyEmber.IndexRoute = Ember.Route.extend({

    model: function () {
        
    }
});