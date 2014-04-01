/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.infoPanel").controller("infoPanelController", ["$scope", function ($scope) {
  "use strict";
  $scope.groupActive = false;
  $scope.employeeActive = false;

  $scope.$watch("group", function (group) {
    if (!group) {
      return;
    }
    $scope.groupActive = true;
    $scope.employeeActive = false;
  });

  $scope.$watch("employee", function (employee) {
    if (!employee) {
      return;
    }
    $scope.groupActive = false;
    $scope.employeeActive = true;
  });
}]);
