/**
 * Created by johnny on 3/9/2015.
 */

(function(app){

    'use strict';


    function schedulerCtrl($http){

        var vms = this;

        vms.time = new Date();
        vms.minDate = new Date();


        vms.tweet = function(){

            var datetime = new Date(
                vms.date.getFullYear(),
                vms.date.getMonth(),
                vms.date.getDate(),
                vms.time.getHours(),
                vms.time.getMinutes()
            );

            console.log(datetime);

            $http.post('/api/post/tweet',{
                message: vms.message,
                datetime: datetime
            }).then(function(){

            });
        }

        vms.opened = false;

        vms.open = function($event){

            $event.preventDefault();
            $event.stopPropagation();

            vms.opened = !vms.opened;
        }

    }

    app.controller('schedulerCtrl',['$http',schedulerCtrl]);

}(angular.module('mainApp')));
