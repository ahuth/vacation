/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("pages.index").controller("indexController", ["$scope", function ($scope) {
  "use strict";
  $scope.group = "";
  $scope.month = new Date().getMonth() + 1;
  $scope.prevMonth = function () {
    $scope.month = $scope.month - 1;
  };
  $scope.nextMonth = function () {
    $scope.month = $scope.month + 1;
  };
}]);
