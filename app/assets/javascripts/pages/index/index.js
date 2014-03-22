/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("pages.index").controller("index", ["$scope", "groupData", "nameModal", "confirmModal", function ($scope, groupData, nameModal, confirmModal) {
  "use strict";
  $scope.groups = groupData.all();
  $scope.newGroup = function () {
    nameModal.open().then(function (name) {
      return groupData.create(name);
    });
  };
  $scope.editGroup = function (group) {
    nameModal.open(group.name).then(function (name) {
      return groupData.update(group.id, { name: name });
    });
  };
  $scope.removeGroup = function (group) {
    confirmModal.open().then(function () {
      return groupData.destroy(group.id);
    });
  };
}]);
