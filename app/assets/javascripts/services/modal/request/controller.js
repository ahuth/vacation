/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("modals.request").controller("requestModalController", ["$scope", "$modalInstance", "attributes", function ($scope, $modalInstance, attributes) {
  "use strict";

  // Compare two days to determine their sort order.
  function dayComparator(first, second) {
    var a = first.date;
    var b = second.date;

    if (a.isBefore(b)) {
      return -1;
    }
    if (a.isAfter(b)) {
      return 1;
    }
    return 0;
  }

  // Process an array of days by sorting them and removing any duplicates.
  function processDays(days) {
    var sorted = days.sort(dayComparator);
    return sorted.filter(function (element, index, array) {
      return array.indexOf(element) === index;
    });
  }

  var days = processDays(attributes.days);

  $scope.title = attributes.title;
  $scope.dates = days.map(function (day) {
    return day.date.format("MMMM Do");
  });

  $scope.ok = function () {
    $modalInstance.close(days);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss(false);
  };
}]);
