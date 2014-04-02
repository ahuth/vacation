/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.modal").controller("confirmModalController", ["$scope", "$modalInstance", "attributes", function ($scope, $modalInstance, attributes) {
  "use strict";
  $scope.title = attributes.title;

  $scope.ok = function () {
    $modalInstance.close(true);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss(false);
  };
}]);

angular.module("services.modal").factory("confirmModal", ["$modal", "objectUtils", function ($modal, objectUtils) {
  "use strict";

  function open(options) {
    var defaults = {
      title: "Are you really really sure?"
    };

    return $modal.open({
      templateUrl: "services/modal/confirm.tmpl.html",
      controller: "confirmModalController",
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
