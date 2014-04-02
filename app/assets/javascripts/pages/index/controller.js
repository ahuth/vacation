/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("pages.index").controller("indexController", ["$scope", function ($scope) {
  "use strict";
  $scope.group = null;
  $scope.employee = null;

  // Set the active group. We do this with an event instead of 2-way data
  // binding because the <groups-list> doesn't have access to the `employee`
  // variable.
  $scope.$on("group-clicked", function (event, group) {
    $scope.group = group;
    $scope.employee = null;
  });
}]);
