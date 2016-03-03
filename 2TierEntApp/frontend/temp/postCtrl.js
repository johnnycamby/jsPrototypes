/**
 * Created by johnny on 3/9/2015.
 */

/*
 $location
   localhost:8000:/api/post/test?id=1
 */

(function(app){

    'use strict';



    function postCtrl($http, $location, toastr){

        var vms = this;

        var id = $location.search().id;


        vms.time = new Date();
        vms.minDate = new Date();


        vms.opened = false;

        vms.open = function($event){

            $event.preventDefault();
            $event.stopPropagation();

            vms.opened = !vms.opened;
        }

        function getPost(){
            $http.get('/api/post/' + id).then(function(post){
                vms.message = post.data.message;
               // vms.date = post.data.datetime;

                var datetime = new Date(post.data.scheduledfor);
                vms.date = datetime;
                vms.time = datetime;
            });

        }

        function newPost(){

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
                scheduledfor: datetime
            }).then(function(){
                toastr.success('New post created !');
            });
        };

        function editPost(){

            var datetime = new Date(
                vms.date.getFullYear(),
                vms.date.getMonth(),
                vms.date.getDate(),
                vms.time.getHours(),
                vms.time.getMinutes()
            );

            $http.post('/api/post/update/' + id,{
                message: vms.message,
                scheduledfor: datetime
            }).then(function(){
                toastr.success('Successfully Editted post !');
            });

        }

        function deletePost(){

            $http.post('/api/post/destroy/' + id)
                .then(function(){
                    toastr.info('Successfully deleted post !');
            });
        }

        vms.delete = deletePost;

        function isEditingPost(){
            return id;
        }

        if(isEditingPost()){
            vms.isEditing = true;
            getPost();
            vms.save = editPost;
        }else{
            vms.save = newPost;
        }


    }

    app.controller('postCtrl',['$http','$location','toastr',postCtrl]);

    app.directive('datepickerPopup', function(){
        return{
            restrict: 'EAC',
            require:'ngModel',
            link:function(scope, element,attr, controller){
                controller.$formatters.shift();
            }
        }
    })

}(angular.module('mainApp')));
