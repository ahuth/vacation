/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.modal").controller("confirmModalController", ["$scope", "$modalInstance", function ($scope, $modalInstance) {
  "use strict";
  $scope.ok = function () {
    $modalInstance.close(true);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss(false);
  };
}]);

angular.module("services.modal").factory("confirmModal", ["$modal", function ($modal) {
  "use strict";

  function open() {
    return $modal.open({
      templateUrl: "services/modal/confirm.tmpl.html",
      controller: "confirmModalController"
    }).result;
  }

  return {
    open: open
  };
}]);
