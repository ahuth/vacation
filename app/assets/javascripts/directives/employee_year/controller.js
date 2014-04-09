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

  // As days are clicked on, create a list of those days. Once a certain amount
  // of time has elapsed without any days being clicked on, process the list.
  $scope.$on("calendar-day-clicked", function (event, day) {
    var delay = captureDelay;
    event.stopPropagation();
    // Cancel the timer if its already activated.
    if (captureTimer) {
      $timeout.cancel(captureTimer);
    }
    // If the first day clicked has already been requested, stop capturing
    // days and immediately process that day.
    if (capturedDays.length === 0 && day.events.length > 0) {
      delay = 0;
    }
    // Add this day to our list and flag it as 'active'.
    capturedDays.push(day);
    day.active = true;
    // Set a new timer.
    captureTimer = $timeout(function () {
      return capturedDays;
    }, delay);
    // After this timer gets resolved, process the list and cleanup.
    captureTimer.then(function (days) {
      parent.console.log(days);
      capturedDays.forEach(function (day) {
        day.active = false;
      });
      capturedDays = [];
      captureTimer = null;
    });
  });
}]);
