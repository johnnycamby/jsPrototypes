
'use strict';

var validator = require('validator');

exports.renderIndex = function(req, res) {

    var safeUserObject = null;

    if (req.user) {

        safeUserObject = {
            displayName: validator.escape(req.user.displayName),
            provider: validator.escape(req.user.provider),
            username: validator.escape(req.user.username),
            created: req.user.created.toString(),
            roles: req.user.roles,
            profileImageURL: req.user.profileImageURL,
            email: validator.escape(req.user.email),
            lastName: validator.escape(req.user.lastName),
            firstName: validator.escape(req.user.firstName),
            additionalProvidersData: req.user.additionalProvidersData
        };
    }

    res.render('modules/core/server/views/index', {
        user: safeUserObject
    });
};

exports.renderServerError = function(req, res) {
    res.status(500).render('modules/core/server/views/500',
    {
         error: 'Oops! Something went wrong...'
    });
};

exports.renderNotFound = function(req, res) {

    res.status(404).format({
        'text/html':function() {
            res.render('modules/core/server/views/404', {
            url: req.originalUrl
            });
        },
        'application/json': function () {
            res.json({
                error: 'Path not found'
            });
        },
        'default': function () {
            res.send('Path not found');
        }
    });
}