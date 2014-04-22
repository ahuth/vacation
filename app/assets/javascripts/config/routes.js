/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("app").config(["$routeProvider", function ($routeProvider) {
  "use strict";
  $routeProvider
    .when("/", {
      templateUrl: "pages/index/template.html",
      controller: "indexController"
    })
    .when("/groups/:group_id", {
      templateUrl: "pages/index/template.html",
      controller: "indexController"
    })
    .when("/employees/:employee_id", {
      templateUrl: "pages/index/template.html",
      controller: "indexController"
    });
}]);
