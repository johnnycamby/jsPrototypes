

(function(){

    'use strict';

    window.app = angular.module('xpCars', ['ngComponentRouter', 'ngAnimate']);

   // Service
    window.app.value('$routerRootComponent', 'carApp');   

})();


/*
 -------------- Lifecycle Hooks -------------------------------
  when using a ngComponentRouter there a number of lifecycle hooks one can tap into with a component.

  $canActivate
  - tell the router if it can try to active one's component,
    - one can use it to implement authorization checks to make sure the current user in his/her current state is allowed to reach one's component

  $routerOnActive
  - tell one if the router is allowed to activate one's component

  $routerCanDeactivate
  - tell one if router is allowed to deactive one's component
  
  $routerOnDeactive
  - prevent a user from navigating away from a form were a user has unsaved data
 
  $routerCanReuse 
 */