/*jslint vars: true, browser: true, es5: true, nomen: true, indent: 2*/
/*global angular */

angular.module("directives.employeeYear").controller("employeeYearController", ["$scope", "$timeout", "$q", "requestData", "requestModal", "confirmModal", "moment", function ($scope, $timeout, $q, requestData, requestModal, confirmModal, moment) {
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

  // Filter out days that have already been requested.
  function removeRequested(days) {
    return days.filter(function (day) {
      return day.events.length === 0;
    });
  }

  // Show the requests modal with the given dates. Manually return a promise so
  // that it will be resolved even if the requestModal promise is rejected.
  function displayRequests(days) {
    var deferred = $q.defer();
    var attributes = { days: days };

    requestModal.open(attributes).then(function (days) {
      deferred.resolve(days);
    }, function () {
      deferred.resolve();
    });

    return deferred.promise;
  }

  // Show the confirm modal for the given dates. Manually return a promise so
  // it will be resolved even if the confirmModal promise is rejected.
  function displayConfirm(days) {
    var deferred = $q.defer();
    // When deleting, the days array will only have 1 element.
    var day = days[0];
    var formattedDate = day.date.format("MMMM Do");
    var attributes = { title: "Delete request on " + formattedDate + "?" };

    confirmModal.open(attributes).then(function () {
      deferred.resolve(day);
    }, function () {
      deferred.resolve();
    });

    return deferred.promise;
  }

  // Create new Requests based on the given dates. Do not return a promise
  // because we want to immediately proceed after making the server request.
  function createRequests(days) {
    if (!Array.isArray(days)) {
      return;
    }
    var dates = days.map(function (day) {
      return day.date;
    });
    var promises = dates.map(function (date) {
      return requestData.create({ date: date, employee_id: $scope.employee.id, group_id: $scope.employee.group_id });
    });
    return days;
  }

  // Delete a request. Does not return the promise we get when destroying the
  // request because we want to immediately proceed from there.
  function deleteRequest(day) {
    if (!day) {
      return;
    }
    var request = day.events[0];
    request.destroy();
    return day;
  }

  // Notify other directives that we've made changes to this employee's
  // requests.
  function signalDirty(days) {
    if (!days) {
      return;
    }
    $scope.$emit("requests-dirty");
  }

  // Update the calendar with any changes to this employee's requests.
  function assignEmployeeRequests() {
    var employeeRequests = requestData.forEmployee($scope.employee.id);
    assignRequests(employeeRequests);
  }

  // Un-set the active flags on the previously captured days.
  function cleanupDays() {
    capturedDays.forEach(function (day) {
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

  // Make a promise chain which will create new requests.
  function handleCreating(timer) {
    return timer
      .then(removeRequested)
      .then(displayRequests)
      .then(createRequests);
  }

  // Make a promise chain that will delete a request.
  function handleDeleting(timer) {
    return timer
      .then(displayConfirm)
      .then(deleteRequest);
  }

  // As days are clicked, create a list of those days. Once a certain amount of
  // time has passed without any more being clicked, process the list.
  $scope.$on("calendar-day-clicked", function (event, day) {
    event.stopPropagation();
    var delay = setDelay(capturedDays, day, captureDelay);
    var deleting = (delay === 0);
    var promise;

    capturedDays.push(day);
    day.active = true;

    captureTimer = setTimer(capturedDays, delay, captureTimer, $timeout.cancel);

    if (deleting) {
      promise = handleDeleting(captureTimer);
    } else {
      promise = handleCreating(captureTimer);
    }

    promise
      .then(signalDirty)
      .then(assignEmployeeRequests)
      .then(cleanupDays)
      .then(resetCapturing);
  });
}]);
