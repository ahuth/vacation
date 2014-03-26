/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("pages.index").controller("index", ["$scope", "groupData", "employeeData", "groupModal", "employeeModal", "confirmModal", function ($scope, groupData, employeeData, groupModal, employeeModal, confirmModal) {
  "use strict";
  $scope.groups = groupData.all();
  $scope.setGroup = function (group) {
    $scope.group = group;
  };
  $scope.newGroup = function () {
    groupModal.open({ title: "New group", placeholder: "Name" }).then(function (name) {
      return groupData.create({ name: name });
    });
  };
  $scope.editGroup = function (group) {
    groupModal.open({ title: "Edit group", placeholder: group.name }).then(function (name) {
      return groupData.update(group, { name: name });
    });
  };
  $scope.removeGroup = function (group) {
    confirmModal.open({ title: "Delete " + group.name + "?"}).then(function () {
      return groupData.destroy(group);
    });
  };
  $scope.newEmployee = function () {
    employeeModal.open({ title: "New person" }).then(function (attributes) {
      return employeeData.create($scope.group, attributes);
    });
  };
  $scope.editEmployee = function (employee) {
    var options = {
      title: "Edit " + employee.name,
      name: employee.name,
      hired: employee.hired
    };
    employeeModal.open(options).then(function (attributes) {
      return employeeData.update(employee, attributes);
    });
  };
  $scope.removeEmployee = function (employee) {
    confirmModal.open({ title: "Delete " + employee.name + "?" }).then(function () {
      return employeeData.destroy($scope.group, employee);
    });
  };
}]);
