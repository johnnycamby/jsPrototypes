/**
 * Created by johnny on 3/5/2015.
 */

(function(app){

    'use strict';

    function markdown(){

        var converter = new Showdown.converter();

        // observes the markdown and use the converter to make an html and update the element's html
        function link(scope, element, attrs){
            attrs.$observe('markdown', function(value){
                var markup = converter.makeHtml(value);
                element.html(markup);
            });
        }

        var directive = {
            link:link,
            restrict: 'A'
        };

        return directive;
    }

    app.directive('markdown',[markdown]);

}(angular.module('mainApp')));