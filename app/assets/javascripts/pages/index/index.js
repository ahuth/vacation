/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("pages.index").controller("index", ["$scope", "groupData", "groupModal", "confirmModal", function ($scope, groupData, groupModal, confirmModal) {
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
    confirmModal.open().then(function () {
      return groupData.destroy(group);
    });
  };
}]);
