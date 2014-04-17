/*jslint vars: true, browser: true, nomen: true, indent: 2*/
/*global angular */

angular.module("directives.groupYear").controller("groupYearController", ["$scope", "$timeout", "$q", "requestData", "approveModal", "moment", function ($scope, $timeout, $q, requestData, approveModal, moment) {
  "use strict";

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

  // When the group changes, update the calendar with its requests.
  $scope.$watch("group", function (group) {
    if (!group) {
      return;
    }
    var groupRequests = requestData.forGroup(group.id);
    assignRequests(groupRequests);
  });

  // If the requests for this group changes, update the calendar.
  $scope.$on("update-calendar", function (event) {
    event.preventDefault();

    var groupRequests = requestData.forGroup($scope.group.id);
    assignRequests(groupRequests);
  });

  // Show the request approval modal. Manually return a promise so that we can
  // resolve it even if the modal's promise is rejected.
  function displayModal(day) {
    var deferred = $q.defer();

    approveModal.open({ requests: day.events }).then(function (encodedRequests) {
      deferred.resolve(encodedRequests);
    }, function () {
      deferred.resolve();
    });

    return deferred.promise;
  }

  // Update the models for requests that were changed (approved or unapproved)
  // in the approval modal.
  function toggleDirtyRequests(encodedRequests) {
    if (!encodedRequests) {
      return;
    }
    encodedRequests.forEach(function (encodedRequest) {
      if (encodedRequest.approved !== encodedRequest.request.approved) {
        encodedRequest.request.toggleApproval();
      }
    });
  }

  $scope.$on("calendar-day-clicked", function (event, day) {
    event.stopPropagation();
    displayModal(day).then(toggleDirtyRequests);
  });
}]);
