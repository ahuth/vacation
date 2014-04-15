/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendarYear").controller("calendarYearController", ["$scope", function ($scope) {
  "use strict";
  $scope.year = new Date().getFullYear();

  $scope.$on("requests-dirty", function (event) {
    event.stopPropagation();
    $scope.$broadcast("requests-dirtied");
  });

  // Show the group calendar if a group is active, and hide the employee panel.
  $scope.$watch("group", function (group) {
    $scope.groupActive = !!group;
    $scope.employeeActive = false;
  });

  // Show the employee calendar if an employee is active. If none are, show the
  // group panel if a group is active.
  $scope.$watch("employee", function (employee) {
    $scope.employeeActive = !!employee;
    $scope.groupActive = ($scope.group) ? (!$scope.employeeActive) : false;
  });
}]);
