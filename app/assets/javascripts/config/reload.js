/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

// Modify the standard `$location.path` method to take a second parameter. When
// this parameter is set to false, changing the route will NOT cause the views
// and controllers to be reloaded.
angular.module("app").run(["$route", "$rootScope", "$location", function ($route, $rootScope, $location) {
  "use strict";
  // Based on:
  // http://joelsaupe.com/programming/angularjs-change-path-without-reloading/
  var original = $location.path;
  $location.path = function (path, reload) {
    if (reload === false) {
      var lastRoute = $route.current;
      var unbind = $rootScope.$on("$locationChangeSuccess", function () {
        $route.current = lastRoute;
        unbind();
      });
    }
    return original.apply($location, [path]);
  };
}]);
