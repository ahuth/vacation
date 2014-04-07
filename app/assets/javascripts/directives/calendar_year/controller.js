/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendarYear").controller("calendarYearController", ["$scope", "$timeout", "requestData", "requestModal", "moment", function ($scope, $timeout, requestData, requestModal, moment) {
  "use strict";
  var captureTime = 800;
  var capturedDays = [];
  var captureTimer;

  $scope.year = moment().year();

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

  $scope.$watch("group", function (group) {
    if (!group) {
      return;
    }
    var groupRequests = requestData.forGroup(group.id);
    assignRequests(groupRequests);
  });

  $scope.$watch("employee", function (employee) {
    if (!employee) {
      return;
    }
    var employeeRequests = requestData.forEmployee(employee.id);
    assignRequests(employeeRequests);
  });

  // Process our list of captured days and clean up.
  function endCapture() {
    // Filter out any days that have already been requested.
    var unrequested = capturedDays.filter(function (day) {
      return day.events.length === 0;
    });
    // Get just the dates and not the entire day object.
    var dates = unrequested.map(function (day) {
      return day.date;
    });
    var promise = requestModal.open({ dates: dates }).then(function (dates) {
      return requestData.createMany(dates, $scope.employee.id, $scope.group.id);
    });
    capturedDays = [];
    return promise;
  }

  // Set a timer. Passing in an existing timer will cancel that one first.
  function setTimer(callback, delay, timer) {
    if (timer) {
      $timeout.cancel(timer);
    }
    return $timeout(function () {
      return callback();
    }, delay);
  }

  // As days are clicked on, make a list of days that we need to process. Once
  // a specified time has elapsed without any being clicked, process the list.
  function employeeDayClicked(day) {
    capturedDays.push(day);
    captureTimer = setTimer(endCapture, captureTime, captureTimer);
    return captureTimer.then(function () {
      // Re-assign the requests for this employee so that any changes show up
      // on the calendar.
      var employeeRequests = requestData.forEmployee($scope.employee.id);
      assignRequests(employeeRequests);
    });
  }

  // Handle click events from our calendar's days.
  $scope.$on("calendar-day-clicked", function (event, day) {
    event.stopPropagation();
    if ($scope.employee) {
      employeeDayClicked(day);
    }
  });
}]);
