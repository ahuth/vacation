/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular, $ */

angular.module("services.route").factory("route", ["$route", "$rootScope", "$location", function ($route, $rootScope, $location) {
  "use strict";

  // Make sure that angular does not reload the view/controller after the next
  // location change.
  function skipNextReload() {
    var lastRoute = $route.current;
    // `$rootScope.$on` returns an un-binding function. Make sure it's called
    // after preventing the next reload so that we don't affect subsequent url
    // changes or cause memory leaks.
    var unbind = $rootScope.$on("$locationChangeSuccess", function () {
      $route.current = lastRoute;
      unbind();
    });
  }

  return {
    skipNextReload: skipNextReload
  };
}]);
