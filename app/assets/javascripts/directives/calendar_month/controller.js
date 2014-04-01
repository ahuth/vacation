/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendarMonth").controller("calendarMonthController", ["$scope", "moment", function ($scope, moment) {
  "use strict";
  // Create an array of dates between and including the start and end dates.
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

  // Calculate the first date we need to show on our calendar. This could be in
  // the previous month.
  function findFirstDay(date) {
    var dayOfWeek = date.day();
    return date.clone().subtract("days", dayOfWeek);
  }

  // Calculate the last date we need to show on our calendar. This could be in
  // the next month.
  function findLastDay(date) {
    var daysInMonth = date.daysInMonth();
    var lastDayInMonth = date.clone().add("days", daysInMonth - 1);
    var dayOfWeek = lastDayInMonth.day();
    var daysToDisplay = daysInMonth + (6 - dayOfWeek);
    return date.clone().add("days", daysToDisplay - 1);
  }

  // Convert a flat array of dates into an array of weeks. Each week is itself
  // an array of dates.
  function splitWeeks(dates) {
    var i;
    var output = [];
    for (i = 0; i < dates.length; i += 7) {
      output.push(dates.slice(i, i + 7));
    }
    return output;
  }

  // Convert an array of dates into an array of date objects. Each date object
  // encodes some more information about the date.
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

  // Add corresponding events to each date object in an array of date objects.
  function addEvents(objects, events) {
    if (!Array.isArray(events)) {
      return objects;
    }
    return objects.map(function (object) {
      object.events = events.filter(function (event) {
        return object.date.isSame(event.date, "day");
      });
      return object;
    });
  }

  // Build an array of weeks for the current month.
  function buildWeeks(date, events) {
    // The first and last date to display. These may or may not be in the month
    // we're showing.
    var firstDay = findFirstDay(date);
    var lastDay = findLastDay(date);
    // Create an array of the dates we need to show on the calendar.
    var dates = createRange(firstDay, lastDay);
    // Convert our dates into objects representing those dates.
    var objects = objectify(dates);
    // Add any relevant events to the dates.
    var objectsWithEvents = addEvents(objects, events);
    // Split the array of objects into weeks.
    return splitWeeks(objectsWithEvents);
  }

  // Update the calendar with the current month and year scope variables.
  function updateCalendar() {
    $scope.date = moment([$scope.year, $scope.month - 1, 1]);
    $scope.monthName = $scope.date.format("MMM");
    $scope.weeks = buildWeeks($scope.date, $scope.events);
  }

  $scope.$watch("month", updateCalendar);
  $scope.$watch("year", updateCalendar);
}]);
