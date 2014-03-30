/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendar-year").controller("calendarYearController", ["$scope", function ($scope) {
  "use strict";
  $scope.year = new Date().getFullYear();
}]);
