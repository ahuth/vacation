/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular, $ */

angular.module("services.route").factory("route", ["$route", "$rootScope", "$location", function ($route, $rootScope, $location) {
  "use strict";
  function skipNextReload() {
    var lastRoute = $route.current;
    var unbind = $rootScope.$on("$locationChangeSuccess", function () {
      $route.current = lastRoute;
      unbind();
    });
  }

  return {
    skipNextReload: skipNextReload
  };
}]);
