/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.infoPanel").controller("infoPanelController", ["$scope", function ($scope) {
  "use strict";
  $scope.groupActive = false;
  $scope.employeeActive = false;

  $scope.$watch("group", function (group) {
    // If the group parameter is defined and not null, set groupActive to true.
    // Otherwise, set it to false.
    $scope.groupActive = !!group;
    $scope.employeeActive = false;
  });

  $scope.$watch("employee", function (employee) {
    // If the employee paramter is defined and not null, set employeeActive to
    // true. Otherwise, set it to false.
    $scope.employeeActive = !!employee;
    $scope.groupActive = false;
  });
}]);
