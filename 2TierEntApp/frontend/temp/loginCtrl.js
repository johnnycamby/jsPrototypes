/**
 * Created by johnny on 3/9/2015.
 */

(function(app){

    'use strict';

    function loginCtrl($auth,$http, toastr){

        var vm = this;

        vm.isAuthenticated = $auth.isAuthenticated;

        vm.login = function(){

            $auth.authenticate('twitter');
            toastr.success('Successfully logged in !');

        }

        vm.logout = function(){
            $auth.logout();
            toastr.success('Successfully logged out!');
        }

    }

    app.controller('loginCtrl', ['$auth','$http','toastr',loginCtrl]);

}(angular.module('mainApp')));
