/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.employeesList").controller("employeesListController", ["$scope", "employeeData", "employeeModal", "confirmModal", function ($scope, employeeData, employeeModal, confirmModal) {
  "use strict";
  $scope.employees = employeeData.all();

  $scope.setEmployee = function (employee) {
    $scope.active = employee;
  };

  // Determine if an employee is from the currently selected group. This will
  // be used to filter the employees list.
  $scope.isFromGroup = function (employee) {
    // Exit early if there is no active group.
    if ($scope.group === null) {
      return false;
    }
    return (employee.group_id === $scope.group.id);
  };

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

  // Set a flag if no group is selected.
  $scope.$watch("group", function (newValue, oldValue) {
    if (!newValue) {
      $scope.noGroup = true;
    } else {
      $scope.noGroup = false;
    }
  });
}]);
