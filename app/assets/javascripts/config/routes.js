/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("app").config(["$routeProvider", function ($routeProvider) {
  "use strict";
  $routeProvider
    .when("/", {
      templateUrl: "pages/groups/groups.tmpl.html",
      controller: "groups"
    });
}]);
