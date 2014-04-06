/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.modal").controller("requestModalController", ["$scope", "$modalInstance", "attributes", function ($scope, $modalInstance, attributes) {
  "use strict";

  // Compare two dates to determine their sort order.
  function dateComparator(a, b) {
    if (a.isBefore(b)) {
      return -1;
    }
    if (a.isAfter(b)) {
      return 1;
    }
    return 0;
  }

  // Process an array of dates by sorting it and removing any duplicates.
  function processDates(dates) {
    var sorted = dates.sort(dateComparator);
    return sorted.filter(function (element, index, array) {
      return array.indexOf(element) === index;
    });
  }

  var dates = processDates(attributes.dates);

  $scope.title = attributes.title;
  $scope.days = dates.map(function (date) {
    return date.format("MMMM Do");
  });

  $scope.ok = function () {
    $modalInstance.close(dates);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss(false);
  };
}]);

angular.module("services.modal").factory("requestModal", ["$modal", "objectUtils", function ($modal, objectUtils) {
  "use strict";

  function open(options) {
    var defaults = {
      title: "Request these days?"
    };

    return $modal.open({
      templateUrl: "services/modal/request/request.tmpl.html",
      controller: "requestModalController",
      resolve: {
        attributes: function () {
          return objectUtils.merge(defaults, options);
        }
      }
    }).result;
  }

  return {
    open: open
  };
}]);
