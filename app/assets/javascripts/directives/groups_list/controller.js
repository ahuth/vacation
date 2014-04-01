/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.groupsList").controller("groupsListController", ["$scope", "groupData", "groupModal", "confirmModal", function ($scope, groupData, groupModal, confirmModal) {
  "use strict";
  $scope.groups = groupData.all();

  $scope.setGroup = function (group) {
    $scope.active = group;
  };
  $scope.newGroup = function () {
    groupModal.open({ title: "New group" }).then(function (attributes) {
      return groupData.create(attributes);
    });
  };
}]);
