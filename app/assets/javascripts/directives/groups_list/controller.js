/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.groups-list").controller("groupsListController", ["$scope", "groupData", "employeeData", "groupModal", "employeeModal", "confirmModal", function ($scope, groupData, employeeData, groupModal, employeeModal, confirmModal) {
  "use strict";
  $scope.groups = groupData.all();

  $scope.setGroup = function (group) {
    $scope.active = group;
  };

  // *************
  // Group actions

  $scope.newGroup = function () {
    groupModal.open({ title: "New group" }).then(function (attributes) {
      return groupData.create(attributes);
    });
  };
  $scope.editGroup = function (group) {
    groupModal.open({ title: "Edit group", name: group.name }).then(function (attributes) {
      return groupData.update(group, attributes);
    });
  };
  $scope.removeGroup = function (group) {
    confirmModal.open({ title: "Delete " + group.name + "?"}).then(function () {
      return groupData.destroy(group);
    });
  };

  // ****************
  // Employee actions

  $scope.newEmployee = function () {
    employeeModal.open({ title: "New person" }).then(function (attributes) {
      return employeeData.create($scope.active, attributes);
    });
  };
  $scope.editEmployee = function (employee) {
    var options = {
      title: "Edit " + employee.name,
      name: employee.name,
      hired: employee.hired
    };
    employeeModal.open(options).then(function (attributes) {
      return employeeData.update($scope.active, employee, attributes);
    });
  };
  $scope.removeEmployee = function (employee) {
    confirmModal.open({ title: "Delete " + employee.name + "?" }).then(function () {
      return employeeData.destroy($scope.active, employee);
    });
  };
}]);
