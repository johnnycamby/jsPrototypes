/**
 * Created by johnny on 3/9/2015.
 */

(function(){

     angular.module('mainApp',
         [
             'satellizer',
             'ui.bootstrap',
             'ui.router',
             'toastr',
             'ngAnimate'
         ])

         .config(['$authProvider','$stateProvider',function($authProvider, $stateProvider){


             $authProvider.twitter({
                 url:'/api/user/login'
             });

             $stateProvider
                 .state('posts', {
                     url:'/',
                     templateUrl:'clientPosts.html',
                     controller:'clientPostsCtrl as vmc'
                 })
                 .state('post', {
                     url:'/post?id',
                     templateUrl:'post.html',
                     controller:'postCtrl as vms'
                 })
         }]);
}());
