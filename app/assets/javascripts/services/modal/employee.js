/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.modal").controller("employeeModalController", ["$scope", "$modalInstance", "title", "name", "hired", function ($scope, $modalInstance, title, name, hired) {
  "use strict";
  $scope.data = { name: name, hired: hired };
  $scope.title = title;
  $scope.form = {};
  $scope.ok = function () {
    $modalInstance.close($scope.data);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss("cancel");
  };
}]);

angular.module("services.modal").factory("employeeModal", ["$modal", "objectUtils", function ($modal, objectUtils) {
  "use strict";

  function open(options) {
    var defaults = {
      title: "Employee",
      name: "",
      hired: ""
    };

    var attributes = objectUtils.merge(defaults, options);

    return $modal.open({
      templateUrl: "services/modal/employee.tmpl.html",
      controller: "employeeModalController",
      resolve: {
        title: function () { return attributes.title; },
        name: function () { return attributes.name; },
        hired: function () { return attributes.hired; }
      }
    }).result;
  }

  return {
    open: open
  };
}]);
