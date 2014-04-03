/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.infoPanel").controller("infoPanelController", ["$scope", function ($scope) {
  "use strict";

  // Show the group panel if a group is active, and hide the employee panel.
  $scope.$watch("group", function (group) {
    $scope.groupActive = !!group;
    $scope.employeeActive = false;
  });

  // Show the employee panel if an employee is active. If none are, show the
  // group panel if a group is active.
  $scope.$watch("employee", function (employee) {
    $scope.employeeActive = !!employee;
    $scope.groupActive = ($scope.group) ? (!$scope.employeeActive) : false;
  });
}]);
