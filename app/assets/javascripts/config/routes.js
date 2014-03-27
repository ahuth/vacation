/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("app").config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  "use strict";
  $stateProvider
    .state("index", {
      abstract: true,
      url: "/",
      templateUrl: "pages/index/index.tmpl.html",
      controller: "indexController"
    })
    .state("index.main", {
      url: "",
      views: {
        "groups": {
          templateUrl: "components/groups/groups.tmpl.html",
          controller: "groupsController"
        }
      }
    });
}]);
