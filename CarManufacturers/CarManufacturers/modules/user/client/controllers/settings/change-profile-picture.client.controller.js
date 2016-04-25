
(function() {

    'use strict';

    angular.module('users').controller('changeProfilePictureController', changeProfilePictureController);

    changeProfilePictureController.$inject = ['$scope', '$timeout', '$window', 'authentication', 'FileUploader'];


    function changeProfilePictureController($scope, $timeout, $window, authentication, FileUploader) {
        var vm = this;

        vm.user = authentication.user;
        vm.imgURL = vm.user.profileImageURL;
        vm.uploadProfilePicture = uploadProfilePicture;
        vm.cancelUpload = cancelUpload;
        
        // Create file uploader instance
        vm.uploader = new FileUploader({
            
            url: 'api/users/picture',
            alias: 'newProfilePicture',
            onAfterAddingFile: onAfterAddingFile,
            onSuccessItem: onSuccessItem,
            onErrorItem: onErrorItem
        });

         // Set file uploader image filter
        vm.uploader.filter.push({
            name: 'imageFilter',
            fn: function(item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // Called after the user selected a new picture file
        function onAfterAddingFile(fileItem) {

            if ($window.FileReader) {

                var fileReader = new FileReader();
                fileReader.readAsDataURL(fileItem._file);

                fileReader.onload = function(fileReaderEvent) {
                    $timeout(function() {
                        vm.imageURL = fileReaderEvent.target.result;
                    }, 0);
                };
            }
        }
        
        // Called after the user has successfully uploaded a new picture
        function onSuccessItem(fileItem, response, status, headers) {
            vm.success = true;
            // Populate user object
            vm.user = authentication.user = response;
            // Clear upload buttons
            cancelUpload();
        }
        
        // Called after the user has failed to uploaded a new picture
        function onErrorItem(fileItem, response, status, headers) {

            cancelUpload();

            vm.error = response.message;
        }
        
        // Change user profile picture
        function uploadProfilePicture() {
            vm.success = vm.error = null;
            
            // Start upload
            vm.uploader.uploadAll();
        }
        
        // Cancel the upload process
        function cancelUpload() {
            vm.uploader.clearQueue();
            vm.imageURL = vm.user.profileImageURL;
        }
    }
})();