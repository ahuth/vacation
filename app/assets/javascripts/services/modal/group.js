/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.modal").controller("groupModalController", ["$scope", "$modalInstance", "title", "name", function ($scope, $modalInstance, title, name) {
  "use strict";
  $scope.data = { name: name };
  $scope.title = title;
  $scope.ok = function () {
    $modalInstance.close($scope.data);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss("cancel");
  };
}]);

angular.module("services.modal").factory("groupModal", ["$modal", "utils", function ($modal, utils) {
  "use strict";

  function open(options) {
    var defaults = {
      title: "Group",
      name: ""
    };

    var attributes = utils.merge(defaults, options);

    return $modal.open({
      templateUrl: "services/modal/group.tmpl.html",
      controller: "groupModalController",
      resolve: {
        title: function () { return attributes.title; },
        name: function () { return attributes.name; }
      }
    }).result;
  }

  return {
    open: open
  };
}]);
