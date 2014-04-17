/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendarYear").controller("calendarYearController", ["$scope", function ($scope) {
  "use strict";
  $scope.year = new Date().getFullYear();

  // When the <employee-year> updates an employee's requests, notify the
  // <group-year> so it can update as well.
  $scope.$on("requests-dirty", function (event) {
    event.stopPropagation();
    $scope.$broadcast("update-calendar");
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

  // When the employee variable is set to null, notify the <group-year> to
  // update. This is so the calendar gets updated when an employee is deleted.
  $scope.$watch("employee", function (newValue, oldValue) {
    if (newValue || newValue === oldValue) {
      return;
    }
    $scope.$broadcast("update-calendar");
  });
}]);
