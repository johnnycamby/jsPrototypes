
var devs = [
    { login: 'johnnycamby', name: 'Johnny Camby' }
    
];

window.GitHub = Ember.Application.create({
    rootElement: '#github-app',
    LOG_TRANSITIONS:true
});

// Register a new library
Ember.Handlebars.registerBoundHelper('fromDate', function (theDate) {

    var today = moment();
    var target = moment(theDate);
    return target.from(today);

});

GitHub.IndexRoute = Ember.Route.extend({
    model: function() {
        return devs;
    }
});

GitHub.Router.map(function() {
    // a 'resource' is a thing 
    // a 'route' is an action
    this.resource(
        "user",
        {
            path: '/users/:login'
        }, function () {
            //Nested urls
            //this.resource("repositories", { path: "repositories" });
            this.resource("repositories");
            this.resource('repository', { path: 'repositories/:reponame' }, function() {
                this.resource('issues');
                this.resource('forks');
                this.resource('commits');
                // posting data, this an action so we use 'route' 
                this.route('newissue');
            });
        });
});

// Ember returns a promise
GitHub.UserRoute = Ember.Route.extend({
    model: function (params) {
        return Ember.$.getJSON("https://api.github.com/users/" + params.login);
    }
});

GitHub.UserIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('user');
    }
});

GitHub.RepositoriesRoute = Ember.Route.extend({
    model: function() {
        var user = this.modelFor('user');
        return Ember.$.getJSON(user.repos_url);
    }
});

GitHub.RepositoryRoute = Ember.Route.extend({
    model: function(params) {
        var user = this.modelFor('user');
        // build the URL for the Repo call manually
        var url = 'https://api.github.com/repos/' + user.login + '/' + params.reponame;
        return Ember.$.getJSON(url);
    }
});

GitHub.IssuesRoute = Ember.Route.extend({
    model: function () {
        var repo = this.modelFor('repository');
        var url = repo.issues_url.replace("{/number}", "");
        return Ember.$.getJSON(url);
    }
});

GitHub.ForksRoute = Ember.Route.extend({
    model: function () {
        var repo = this.modelFor('repository');
        return Ember.$.getJSON(repo.forks_url);
    }
});

GitHub.CommitsRoute = Ember.Route.extend({
    model: function () {
        var repo = this.modelFor('repository');
        var url = repo.commits_url.replace("{/sha}", "");
        return Ember.$.getJSON(url);
    }
});

GitHub.RepositoriesController = Ember.ArrayController.extend({
    // this controller needs data on the 'user' controller
    needs: ['user'],
    // to convoy the data down to the template use the 'computed.alias'
    user: Ember.computed.alias("controllers.user")
});

GitHub.RepositoryController = Ember.ObjectController.extend({

    needs: ['user'],
    user: Ember.computed.alias('controllers.user'),
    forked: Ember.computed.alias('fork')
    //notForked: Ember.computed.not('fork')
});

GitHub.Issue = Ember.Object.extend({

    title: '',
    body: '',
    isValid: function() {
        // do some validations...
        return true;
    }
});

GitHub.RepositoryNewissueController = Ember.Controller.extend({

    needs: ['repository'],
    repo: Ember.computed.alias('controllers.repository'),
    issue: function() {
        return GitHub.Issue.create();
    }.property('repo.model'),
    actions : {
        submitIssue: function () {

            //var title = $('#new-issue-title').val();
            //var body = $('#new-issue-body').val();

            //var vals = this.getProperties('title', 'body');
            //console.log(vals);

            var issue = this.get('issue');

            // POST issues_url
            var url = this.get('repo').get('issues_url');
            //Ember.$.post(url, { title: title, body: body }, function(result) {
            //    // success
            //    this.transitionToRoute('issues');
            //    alert('Issue submitted!');
            //});
            //console.log('Submitted :: ' + title + ', ' + body + ' to :: ' + url);
            //console.log('Submitted :: ' + this.get('title') + ', ' + this.get('body') + ' to :: ' + url);
            console.log('Submitted :: ' + issue.get('title') + ', ' + issue.get('body') + ' to :: ' + url);
            // reset 'issue'
            this.set('issue', GitHub.Issue.create());
            this.transitionToRoute('issues');
        }
    }
});