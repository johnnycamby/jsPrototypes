
// payload

window.UserAdmin = Ember.Application.create({

    rootElement: '#user-admin-app',
    LOG_TRANSITIONS:true
});

// Register a new library
Ember.Handlebars.registerBoundHelper('fromDate', function (theDate) {

    var today = moment();
    var target = moment(theDate);
    return target.from(today);

});

UserAdmin.BreadCrumbView = Ember.View.extend({
    templateName: 'breadcrumbs',
    pageTitle: 'Something'

});


UserAdmin.Router.map(function() {
    this.resource('users'
    //    , function () {
    //    this.resource('user', { path: 'users/:username' });
    //}
    );

    this.resource('user', { path: 'users/:user_id'}, function() {
        this.route('editinfo', { path: 'edit' });
        this.route('changepassword', { path: 'change-password' });
        this.route('changeroles', { path: 'edit-roles' });
        this.route('addnote', { path: 'add-note' });
    });
});

/**
 * DS => data store
 */
UserAdmin.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:54556',
    namespace:'api'
});


//create a model
UserAdmin.User = DS.Model.extend({
    //postId: DS.attr('string'),
    email: DS.attr('string'),
    userName: DS.attr('string'),
    firstname: DS.attr('string'),
    lastname: DS.attr('string'),
    bio: DS.attr('string'),
    twitter: DS.attr('string'),
    created_at: DS.attr("date"),
    logs: DS.hasMany('log', { async: true }),
    notes: DS.hasMany('note', { async: true }),
    membership: DS.hasMany('membership', { async: true })
});

UserAdmin.Role = DS.Model.extend({
    name: DS.attr('string'),
    membership: DS.hasMany('membership')
});

UserAdmin.Log = DS.Model.extend({
    entry: DS.attr('string'),
    user: DS.belongsTo('user'),
    created_at: DS.attr('date')
});


UserAdmin.Note = DS.Model.extend({
    note: DS.attr('string'),
    user: DS.belongsTo('user'),
    created_at: DS.attr('date')
});

UserAdmin.Membership = DS.Model.extend({
    role: DS.attr('string'),
    user: DS.belongsTo('user')
});


UserAdmin.UsersRoute = Ember.Route.extend({
    //model: function() {
    //    //return this.store.findAll('user');
    //    return this.store.find('user');
    //},
    setupController: function(controller, model) {
        controller.loadUsers();
    }
});

//UserAdmin.UserRoute = Ember.Route.extend({
//    model: function (params) {
//        return this.store.find('user', params.id );
//    }
//});

/*
 * NB
 * A 'model'  is created by the route and passed into the controller, then the controller proxys the 
 * model thus takes it and keeps it for its use
 */

UserAdmin.UserController = Ember.ObjectController.extend({
    fullName: function() {
        return this.get('firstname') + " " + this.get('lastname');
    }.property('firstname', 'lastname')
});

UserAdmin.UsersController = Ember.ArrayController.extend({

    loadUsers : function() {
        var q = this.get('searchTerm');
        // rewrite the models back into the controller
        this.set("model", this.store.find("user", { q: q, limit: 3 }));

    },

    title: function () {
        var q = this.get('searchTerm');
        if (q) {
            return "Searching for " + q;
        } else {

            return "Last 20 Users";
        }  
    }.property('searchTerm'),

    searchTerm: "",
    actions: {
        searchForUser: function () {
            this.loadUsers();

            //console.log(this.get('searchTerm'));
            //var self = this;
            // since we r in a Json-get callback, 'this' has been rescoped
            //Ember.$.getJSON('http://localhost:54556/api/users', {q: q}, function(data) {
            //    self.set('model', data.users);
            //});
        }
    }
});

//Uncaught ReferenceError: (generated user.index controller)#needs does not include `user`. To access the user controller from (generated user.index controller), (generated user.index controller) should have a `needs` property that is an array of the controllers it has access to.
UserAdmin.UserIndexController = Ember.ObjectController.extend({
    needs: ['user']
});

UserAdmin.UserEditinfoController = Ember.ObjectController.extend({
    needs: ['user'],
    actions: {
        saveUser: function() {
            var user = this.get("controllers.user.model");
            user.save();
        }
    }
});

UserAdmin.UserAddnoteController = Ember.Controller.extend({
    needs: ['user'],
    sortProperties: ['created_at:desc'],
    notes: Ember.computed.sort('controllers.user.notes', 'sortProperties'),
    actions: {
        saveNote: function() {
            var note = $('#new-note').val();
            var user = this.get('controllers.user');
            var newNote = this.store.createRecord('note', { note: note, created_at: new Date() });
            user.get('notes').pushObject(newNote);
            newNote.save();
        }
    }
});
// Uncaught Error: Assertion Failed: The value that #each loops over must be an Array. You passed UserAdmin.RolesController, but it should have been an ArrayController
UserAdmin.RolesController = Ember.ArrayController.extend({
    needs: ['user'],
    itemController: 'role'
});

UserAdmin.RoleController = Ember.ObjectController.extend({
    needs: ['user'],
    userIsAssigned: function() {
        var role = this.get('model');
        var user = this.get('controllers.user');
        // console.log('Wonder if ' + user.get('firstname') + 'is assigned' + role.get('name'));
        var roles = user.get("roles");
        return roles.contains(role);
    }.property()
});



UserAdmin.UserChangerolesController = Ember.Controller.extend({

    needs: ['user'],
    roles : function() {
        return this.store.find('role');
    }.property()
});

// access property or properties in Ember using 'get()'
UserAdmin.GravatarImageComponent = Ember.Component.extend({
    email: '',
    size: 120,
    gravatarUrl: function() {
        var email = this.get('email');
        var size = this.get('size');
        var hashed = 'http://www.gravatar.com/avatar/' + hex_md5(email) + '?s=' + size;
        return hashed;
    }.property('email', 'size')
});

 