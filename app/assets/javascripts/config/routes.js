/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("app").config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  "use strict";
  $stateProvider
    .state("index", {
      url: "/",
      templateUrl: "pages/index/index.tmpl.html",
      controller: "index"
    });
}]);
