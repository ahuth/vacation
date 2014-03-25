/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.modal").controller("groupModalController", ["$scope", "$modalInstance", "title", "placeholder", function ($scope, $modalInstance, title, placeholder) {
  "use strict";
  $scope.name = { text: "" };
  $scope.title = title;
  $scope.placeholder = placeholder;
  $scope.ok = function () {
    $modalInstance.close($scope.name.text);
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
      placeholder: "Name"
    };

    var attributes = utils.merge(defaults, options);

    return $modal.open({
      templateUrl: "services/modal/group.tmpl.html",
      controller: "groupModalController",
      resolve: {
        title: function () { return attributes.title; },
        placeholder: function () { return attributes.placeholder; }
      }
    }).result;
  }

  return {
    open: open
  };
}]);
