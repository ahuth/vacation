/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("modals.employee").controller("employeeModalController", ["$scope", "$modalInstance", "attributes", function ($scope, $modalInstance, attributes) {
  "use strict";
  $scope.data = { name: attributes.name, hired: attributes.hired };
  $scope.title = attributes.title;
  $scope.form = {};
  $scope.ok = function () {
    $modalInstance.close($scope.data);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss("cancel");
  };
}]);
