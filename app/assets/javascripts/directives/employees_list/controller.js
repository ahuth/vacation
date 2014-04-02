/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.employeesList").controller("employeesListController", ["$scope", "employeeData", "employeeModal", "confirmModal", "arrayUtils", function ($scope, employeeData, employeeModal, confirmModal, arrayUtils) {
  "use strict";
  $scope.employees = employeeData.all();

  $scope.employeeClicked = function (employee) {
    $scope.employee = employee;
  };

  $scope.isActive = function (employee) {
    if (!$scope.employee) {
      return;
    }
    return employee.id === $scope.employee.id;
  };

  // Determine if an employee is from the currently selected group. This will
  // be used to filter the employees list.
  $scope.isFromGroup = function (employee) {
    if (!$scope.group) {
      return false;
    }
    return (employee.group_id === $scope.group.id);
  };

  $scope.newEmployee = function () {
    employeeModal.open({ title: "New person" }).then(function (attributes) {
      attributes.group_id = $scope.group.id;
      var promise = employeeData.create(attributes);
      $scope.employee = arrayUtils.lastItem($scope.employees);
      return promise;
    });
  };
}]);
