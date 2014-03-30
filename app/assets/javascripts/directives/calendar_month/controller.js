/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendar-month").controller("calendarMonthController", ["$scope", "moment", function ($scope, moment) {
  "use strict";
  // createRange creates an array of dates that are between and include the
  // start and end dates.
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

  // findFirstDay calculates the first date we need to show on our calendar.
  // This could be in the previous month.
  function findFirstDay(date) {
    var dayOfWeek = date.day();
    return date.clone().subtract("days", dayOfWeek);
  }

  // findLastDay calculates the last date we need to show on our calendar. This
  // could be in the next month.
  function findLastDay(date) {
    var daysInMonth = date.daysInMonth();
    var lastDayInMonth = date.clone().add("days", daysInMonth - 1);
    var dayOfWeek = lastDayInMonth.day();
    var daysToDisplay = daysInMonth + (6 - dayOfWeek);
    return date.clone().add("days", daysToDisplay - 1);
  }

  // splitWeeks converts an array of dates into an array of weeks. Each week is
  // an array of that week's days.
  function splitWeeks(dates) {
    var i;
    var output = [];
    for (i = 0; i < dates.length; i += 7) {
      output.push(dates.slice(i, i + 7));
    }
    return output;
  }

  // objectify converts an array of dates into an array of objects, where each
  // object has pertinent information about the date.
  function objectify(dates) {
    return dates.map(function (date) {
      return {
        date: date,
        day: date.date(),
        notmonth: (date.month() !== $scope.date.month()),
        weekend: (date.day() === 0 || date.day() === 6)
      };
    });
  }

  // buildWeeks creates an array of weeks for the current month.
  function buildWeeks() {
    // The first and last date to display. These may or may not be in the month
    // we're showing.
    var firstDay = findFirstDay($scope.date);
    var lastDay = findLastDay($scope.date);
    // Create an array of dates.
    var dates = createRange(firstDay, lastDay);
    // Convert our dates into objects representing those dates.
    var objects = objectify(dates);
    // Split the array of objects into weeks.
    return splitWeeks(objects);
  }

  // updateCalendar updates the calendar with the current scope variables of
  // year and month.
  function updateCalendar() {
    $scope.date = moment([$scope.year, $scope.month - 1, 1]);
    $scope.monthName = $scope.date.format("MMM");
    $scope.weeks = buildWeeks();
  }

  $scope.$watch("month", updateCalendar);
  $scope.$watch("year", updateCalendar);
}]);
