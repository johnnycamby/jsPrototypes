/**
 * Created by johnny on 3/10/2015.
 */

(function(app){

    'use strict';

    function clientPostsCtrl($http){

        var vmc = this;

        $http.get('/api/post/clientPosts').then(function(posts){

            vmc.posts = posts.data;
        });
    }

    app.controller('clientPostsCtrl',['$http',clientPostsCtrl])
}(angular.module('mainApp')));
