/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendarYear").controller("calendarYearController", ["$scope", "requestData", function ($scope, requestData) {
  "use strict";
  $scope.year = new Date().getFullYear();
  $scope.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (num) {
    return {
      month: num
    };
  });

  $scope.$watch("group", function (newValue, oldValue) {
    if (!newValue) {
      $scope.requests = null;
      return;
    }
    $scope.requests = requestData.all().filter(function (request) {
      return (request.group_id === $scope.group.id);
    });
  });
}]);
