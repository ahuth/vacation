/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.infoPanel").controller("infoPanelController", ["$scope", function ($scope) {
  "use strict";

  // When the active group changes, show the group panel. If the group is
  // deleted, don't show any panel.
  $scope.$watch("group", function (group) {
    $scope.groupActive = !!group;
    $scope.employeeActive = false;
  });

  // When the active employee changes, show the employee panel. If the employee
  // is deleted, hide the employee panel and show the group one.
  $scope.$watch("employee", function (employee) {
    $scope.employeeActive = !!employee;
    $scope.groupActive = !$scope.employeeActive;
  });
}]);
