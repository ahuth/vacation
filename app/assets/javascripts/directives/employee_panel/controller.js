/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.employeePanel").controller("employeePanelController", ["$scope", "employeeData", "employeeModal", "confirmModal", function ($scope, employeeData, employeeModal, confirmModal) {
  "use strict";

  $scope.newEmployee = function () {
    employeeModal.open({ title: "New person" }).then(function (attributes) {
      attributes.group_id = $scope.group.id;
      return employeeData.create(attributes);
    });
  };
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
      return employee.destroy();
    });
  };
}]);
