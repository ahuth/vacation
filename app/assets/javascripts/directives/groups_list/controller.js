/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.groupsList").controller("groupsListController", ["$scope", "groupData", "groupModal", "confirmModal", function ($scope, groupData, groupModal, confirmModal) {
  "use strict";
  $scope.groups = groupData.all();

  $scope.groupClicked = function (group) {
    $scope.$emit("group-clicked", group);
  };

  function lastItem(array) {
    var lastIndex = array.length - 1;
    return array[lastIndex];
  }

  $scope.newGroup = function () {
    groupModal.open({ title: "New group" }).then(function (attributes) {
      var promise = groupData.create(attributes);
      $scope.$emit("group-clicked", lastItem($scope.groups));
      return promise;
    });
  };
}]);
