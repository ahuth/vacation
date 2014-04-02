/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("pages.index").controller("indexController", ["$scope", function ($scope) {
  "use strict";
  $scope.group = null;
  $scope.employee = null;

  $scope.$on("group-clicked", function (event, group) {
    $scope.group = group;
    $scope.employee = null;
  });

  $scope.$on("employee-clicked", function (event, employee) {
    $scope.employee = employee;
  });
}]);
