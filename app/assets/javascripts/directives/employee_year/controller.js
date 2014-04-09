/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.employeeYear").controller("employeeYearController", ["$scope", "$timeout", "requestData", "requestModal", "moment", function ($scope, $timeout, requestData, requestModal, moment) {
  "use strict";
  var capturedDays = [];
  var captureDelay = 800;
  var captureTimer;

  // Create an array of months. We will render a <calendar-month> for each of
  // these.
  $scope.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (num) {
    var date = moment([$scope.year, num - 1]);
    return {
      date: date,
      month: date.month() + 1,
      requests: []
    };
  });

  // Take a list of requests and assign them to their corresponding month.
  function assignRequests(requests) {
    $scope.months.forEach(function (month) {
      month.requests = requests.filter(function (request) {
        return month.date.isSame(request.date, "month");
      });
    });
  }

  // When the employee changes, update the calendar with her requests.
  $scope.$watch("employee", function (employee) {
    if (!employee) {
      return;
    }
    var employeeRequests = requestData.forEmployee(employee.id);
    assignRequests(employeeRequests);
  });

  // Process the captured days and log them to the console.
  function processDays(days) {
    parent.console.log(days);
    return days;
  }

  // Un-set the active flags on the previously captured days.
  function cleanupDays(days) {
    days.forEach(function (day) {
      day.active = false;
    });
  }

  // Destroy the current timer and captured days list.
  function resetCapturing() {
    capturedDays = [];
    captureTimer = null;
  }

  // Given the current state of day capturing and the next day to be captured,
  // determine what the delay should be.
  function setDelay(days, currentDay, defaultDelay) {
    // If this day is the first to be captured and its already been requested,
    // set no delay.
    if (days.length === 0 && currentDay.events.length > 0) {
      return 0;
    }
    return defaultDelay;
  }

  // Set a new timer. If a previous one is set, cancel it first.
  function setTimer(days, delay, previousTimer, cancelFunction) {
    if (previousTimer) {
      cancelFunction(previousTimer);
    }
    return $timeout(function () {
      return days;
    }, delay);
  }

  // As days are clicked, create a list of those days. Once a certain amount of
  // time has passed without any more being clicked, process the list.
  $scope.$on("calendar-day-clicked", function (event, day) {
    event.stopPropagation();
    var delay = setDelay(capturedDays, day, captureDelay);
    // Add this day to our list and flag it as 'active'.
    capturedDays.push(day);
    day.active = true;
    // Cancel any running timers and set a new one.
    captureTimer = setTimer(capturedDays, delay, captureTimer, $timeout.cancel);
    // After this timer resolves, process the list and cleanup.
    captureTimer.then(processDays)
                .then(cleanupDays)
                .then(resetCapturing);
  });
}]);
