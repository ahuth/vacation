/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("pages.index").controller("indexController", ["$scope", function ($scope) {
  "use strict";
  $scope.group = "";
  $scope.month = new Date().getMonth() + 1;
  $scope.year = new Date().getYear();

  $scope.prevMonth = function () {
    $scope.month = $scope.month - 1;
  };
  $scope.nextMonth = function () {
    $scope.month = $scope.month + 1;
  };
  $scope.prevYear = function () {
    $scope.year = $scope.year - 1;
  };
  $scope.nextYear = function () {
    $scope.year = $scope.year + 1;
  };
}]);
