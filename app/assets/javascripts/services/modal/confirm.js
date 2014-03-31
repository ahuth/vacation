/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.modal").controller("confirmModalController", ["$scope", "$modalInstance", "title", function ($scope, $modalInstance, title) {
  "use strict";
  $scope.title = title;

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

    var attributes = objectUtils.merge(defaults, options);

    return $modal.open({
      templateUrl: "services/modal/confirm.tmpl.html",
      controller: "confirmModalController",
      resolve: {
        title: function () { return attributes.title; }
      }
    }).result;
  }

  return {
    open: open
  };
}]);
