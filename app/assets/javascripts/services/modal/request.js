/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.modal").controller("requestModalController", ["$scope", "$modalInstance", "attributes", function ($scope, $modalInstance, attributes) {
  "use strict";
  $scope.title = attributes.title;
  $scope.days = attributes.days.map(function (day) {
    return day.date.format("MMMM Do");
  });

  $scope.ok = function () {
    $modalInstance.close(true);
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
      templateUrl: "services/modal/request.tmpl.html",
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
