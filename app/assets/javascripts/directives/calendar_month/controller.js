/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendar-month").controller("calendarMonthController", ["$scope", "moment", function ($scope, moment) {
  "use strict";
  // Create an array of dates between a start and end.
  function createRange(startDate, endDate) {
    // In our loop, we immediately add 1 to the start date, so subtract 1
    // before we start.
    var date = startDate.clone().subtract("days", 1);
    var output = [];
    while (date.isBefore(endDate)) {
      output.push(date.add("days", 1).clone());
    }
    return output;
  }

  // Find the first day to display on our calendar. This could be a date in the
  // previous month.
  function findFirstDay(date) {
    var dayOfWeek = date.day();
    return date.clone().subtract("days", dayOfWeek);
  }

  // Find the last day to display on our calendar. This could be a date in the
  // next month.
  function findLastDay(date) {
    var numDays = date.daysInMonth();
    var dayOfWeek = date.clone().add("days", numDays).day();
    var daysToDisplay = numDays + (6 - dayOfWeek);
    return date.clone().add("days", daysToDisplay);
  }

  // Split a range of dates into an array of weeks.
  function splitWeeks(dates) {
    var i;
    var output = [];
    for (i = 0; i < dates.length; i += 7) {
      output.push(dates.slice(i, i + 7));
    }
    return output;
  }

  // Encode our dates with the information they need to be rendered properly.
  function objectivize(dates) {
    return dates.map(function (date) {
      return {
        date: date,
        day: date.date(),
        notmonth: (date.month() !== $scope.date.month()),
        weekend: (date.day() === 0 || date.day() === 6)
      };
    });
  }

  function buildWeeks() {
    // The first and last date to display. These may or may not be in the month
    // we're showing.
    var firstDay = findFirstDay($scope.date);
    var lastDay = findLastDay($scope.date);
    // Create an array of dates.
    var dates = createRange(firstDay, lastDay);
    // Convert our dates into objects representing those dates.
    var objects = objectivize(dates);

    return splitWeeks(objects);
  }

  $scope.$watch("month", function (newValue, oldValue) {
    $scope.date = moment($scope.year + "-" + newValue + "-1");
    $scope.monthName = $scope.date.format("MMM");
    $scope.weeks = buildWeeks();
  });
}]);
