/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.infoPanel").controller("infoPanelController", ["$scope", function ($scope) {
  "use strict";

  $scope.$watch("group", function (group) {
    if (!group) {
      $scope.groupActive = false;
    } else {
      $scope.groupActive = true;
    }
    $scope.employeeActive = false;
  });

  $scope.$watch("employee", function (employee) {
    if (!employee) {
      $scope.groupActive = true;
      $scope.employeeActive = false;
    } else {
      $scope.groupActive = false;
      $scope.employeeActive = true;
    }
  });
}]);
