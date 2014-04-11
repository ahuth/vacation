/*jslint vars: true, browser: true, nomen: true, indent: 2*/
/*global angular */

angular.module("services.modal").controller("approveModalController", ["$scope", "$modalInstance", "employeeData", "attributes", function ($scope, $modalInstance, employeeData, attributes) {
  "use strict";

  $scope.title = attributes.title;
  $scope.encodedRequests = attributes.requests.map(function (request) {
    return {
      employee: employeeData.find(request.employee_id),
      request: request,
      approved: request.approved
    };
  });

  $scope.save = function () {
    $modalInstance.close($scope.encodedRequests);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss(false);
  };
}]);
