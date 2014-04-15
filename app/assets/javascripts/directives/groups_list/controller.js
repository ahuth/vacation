/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.groupsList").controller("groupsListController", ["$scope", "groupData", "groupModal", "arrayUtils", function ($scope, groupData, groupModal, arrayUtils) {
  "use strict";
  $scope.groups = groupData.all();

  // Find the first group alphabetically by name.
  function firstGroup(groups) {
    if (groups.length === 0) {
      return;
    }
    return groups.reduce(function (current, group) {
      if (group.name < current.name) {
        return group;
      }
      return current;
    }, groups[0]);
  }

  // When the app loads, set the active group to first one in the list.
  if ($scope.groups.length > 0) {
    $scope.group = firstGroup($scope.groups);
  }

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
