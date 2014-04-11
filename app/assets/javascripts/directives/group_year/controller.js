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

  function displayModal(day) {
    var deferred = $q.defer();

    approveModal.open({ requests: day.events }).then(function (encodedRequests) {
      deferred.resolve(encodedRequests);
    }, function () {
      deferred.resolve();
    });

    return deferred.promise;
  }

  $scope.$on("calendar-day-clicked", function (event, day) {
    event.stopPropagation();
    displayModal(day).then(function (encodedRequests) {
      parent.console.log(encodedRequests);
    });
  });
}]);
