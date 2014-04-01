/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendarYear").controller("calendarYearController", ["$scope", "requestData", "moment", function ($scope, requestData, moment) {
  "use strict";
  $scope.year = moment().year();

  // Create an array of months. We will render a <calendar-month> for each of
  // these.
  $scope.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (num) {
    var date = moment([$scope.year, num - 1]);
    return {
      date: date,
      month: date.month() + 1
    };
  });

  // When the active group changes, add a `requests` array to each `month`
  // object.
  $scope.$watch("group", function (group) {
    $scope.months.forEach(function (month) {
      if (!group) {
        month.requests = [];
        return;
      }
      month.requests = requestData.forGroup(group.id).filter(function (request) {
        return month.date.isSame(request.date, "month");
      });
    });
  });
}]);
