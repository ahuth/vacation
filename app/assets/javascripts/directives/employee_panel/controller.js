/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.employeePanel").controller("employeePanelController", ["$scope", "employeeData", "employeeModal", "confirmModal", function ($scope, employeeData, employeeModal, confirmModal) {
  "use strict";

  $scope.editEmployee = function (employee) {
    var options = {
      title: "Edit " + employee.name,
      name: employee.name,
      hired: employee.hired
    };
    employeeModal.open(options).then(function (attributes) {
      return employee.update(attributes);
    });
  };

  $scope.removeEmployee = function (employee) {
    confirmModal.open({ title: "Delete " + employee.name + "?" }).then(function () {
      var promise = employee.destroy();
      $scope.employee = null;
      return promise;
    });
  };
}]);
