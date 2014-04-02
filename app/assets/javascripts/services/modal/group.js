/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.modal").controller("groupModalController", ["$scope", "$modalInstance", "attributes", function ($scope, $modalInstance, attributes) {
  "use strict";
  $scope.data = { name: attributes.name };
  $scope.title = attributes.title;
  $scope.form = {};
  $scope.ok = function () {
    $modalInstance.close($scope.data);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss("cancel");
  };
}]);

angular.module("services.modal").factory("groupModal", ["$modal", "objectUtils", function ($modal, objectUtils) {
  "use strict";

  function open(options) {
    var defaults = {
      title: "Group",
      name: ""
    };

    return $modal.open({
      templateUrl: "services/modal/group.tmpl.html",
      controller: "groupModalController",
      resolve: {
        attributes: function () {
          return objectUtils.merge(defaults, options);
        }
      }
    }).result;
  }

  return {
    open: open
  };
}]);
