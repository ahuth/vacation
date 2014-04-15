/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.groupsList").controller("groupsListController", ["$scope", "groupData", "groupModal", "confirmModal", "arrayUtils", function ($scope, groupData, groupModal, confirmModal, arrayUtils) {
  "use strict";
  $scope.groups = groupData.all();

  $scope.newGroup = function () {
    groupModal.open({ title: "New group" }).then(function (attributes) {
      var promise = groupData.create(attributes);
      // Make the newly created group active.
      $scope.group = arrayUtils.lastItem($scope.groups);
      $scope.employee = null;
      return promise;
    });
  };
}]);
