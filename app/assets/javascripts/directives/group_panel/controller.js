/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.groupPanel").controller("groupPanelController", ["$scope", "groupData", "groupModal", "confirmModal", function ($scope, groupData, groupModal, confirmModal) {
  "use strict";

  $scope.newGroup = function () {
    groupModal.open({ title: "New group" }).then(function (attributes) {
      return groupData.create(attributes);
    });
  };
  $scope.editGroup = function (group) {
    groupModal.open({ title: "Edit group", name: group.name }).then(function (attributes) {
      return group.update(attributes);
    });
  };
  $scope.removeGroup = function (group) {
    confirmModal.open({ title: "Delete " + group.name + "?"}).then(function () {
      return group.destroy();
    });
  };
}]);
