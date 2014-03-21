/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("pages.groups").controller("groups", ["$scope", "groupData", "nameModal", function ($scope, groupData, nameModal) {
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
    groupData.destroy(group.id);
  };
}]);
