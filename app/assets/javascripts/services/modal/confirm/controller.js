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
