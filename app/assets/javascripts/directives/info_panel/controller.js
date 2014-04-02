/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.infoPanel").controller("infoPanelController", ["$scope", function ($scope) {
  "use strict";

  $scope.$watch("group", function (group) {
    // If the group parameter is defined and not null, set groupActive to true.
    // Otherwise, set it to false.
    $scope.groupActive = !!group;
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
