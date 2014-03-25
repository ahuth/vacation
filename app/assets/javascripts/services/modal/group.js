/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.modal").controller("groupModalController", ["$scope", "$modalInstance", "title", "placeholder", function ($scope, $modalInstance, title, placeholder) {
  "use strict";
  $scope.name = { text: "" };
  $scope.title = title || "Name";
  $scope.placeholder = placeholder || "";
  $scope.ok = function () {
    $modalInstance.close($scope.name.text);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss("cancel");
  };
}]);

angular.module("services.modal").factory("groupModal", ["$modal", function ($modal) {
  "use strict";

  function open(opts) {
    var title, placeholder;

    if (opts !== null && typeof opts === "object") {
      title = opts.title;
      placeholder = opts.placeholder;
    }

    return $modal.open({
      templateUrl: "services/modal/group.tmpl.html",
      controller: "groupModalController",
      resolve: {
        title: function () { return title; },
        placeholder: function () { return placeholder; }
      }
    }).result;
  }

  return {
    open: open
  };
}]);
