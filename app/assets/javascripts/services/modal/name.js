/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.modal").factory("nameModal", ["$modal", function ($modal) {
  "use strict";

  function nameController($scope, $modalInstance, placeholder) {
    $scope.name = { text: "" };
    $scope.placeholder = placeholder || "";
    $scope.ok = function () {
      $modalInstance.close($scope.name.text);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss("cancel");
    };
  }

  function open(placeholder) {
    return $modal.open({
      templateUrl: "services/modal/name.tmpl.html",
      controller: nameController,
      resolve: {
        placeholder: function () { return placeholder; }
      }
    }).result;
  }

  return {
    open: open
  };
}]);
