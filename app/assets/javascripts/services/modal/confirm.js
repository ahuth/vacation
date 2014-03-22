/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.modal").factory("confirmModal", ["$modal", function ($modal) {
  "use strict";

  function confirmController($scope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close(true);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss(false);
    };
  }

  function open() {
    return $modal.open({
      templateUrl: "services/modal/confirm.tmpl.html",
      controller: confirmController
    }).result;
  }

  return {
    open: open
  };
}]);
