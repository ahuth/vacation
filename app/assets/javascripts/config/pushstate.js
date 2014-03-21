/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("app").config(["$locationProvider", function ($locationProvider) {
  "use strict";

  $locationProvider.html5Mode(true);
}]);
