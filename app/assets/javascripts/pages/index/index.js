/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("pages.index").controller("indexController", ["$scope", function ($scope) {
  "use strict";
  $scope.$on("set-group", function (event, group) {
    $scope.group = group;
  });
}]);
