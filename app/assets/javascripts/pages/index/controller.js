/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("pages.index").controller("indexController", ["$scope", "$location", "$routeParams", "groupData", "employeeData", "route", function ($scope, $location, $routeParams, groupData, employeeData, route) {
  "use strict";
  // If route parameters are present, set the group and employee variables.
  if ($routeParams.group_id) {
    $scope.group = groupData.find($routeParams.group_id);
  } else if ($routeParams.employee_id) {
    $scope.employee = employeeData.find($routeParams.employee_id);
    $scope.group = groupData.find($scope.employee.group_id);
  }

  // Change the url when the group changes.
  $scope.$watch("group", function (newValue, oldValue) {
    if (newValue === oldValue) {
      return;
    }
    var path = (newValue) ? ("/groups/" + newValue.id) : "";
    // Because our data is already completely loaded, don't refresh the view or
    // controller after this next url change.
    route.skipNextReload();
    $location.path(path);
  });

  // Change the url when the employee changes.
  $scope.$watch("employee", function (newValue, oldValue) {
    var path;
    if (newValue === oldValue) {
      return;
    }
    if (newValue) {
      path = "/employees/" + $scope.employee.id;
    } else if ($scope.group) {
      path = "/groups/" + $scope.group.id;
    } else {
      path = "";
    }
    // Because our data is already completely loaded, don't refresh the view or
    // controller after this next url change.
    route.skipNextReload();
    $location.path(path);
  });

  // Apply the 'active' class to the root nav item. The class may not be on the
  // nav item if we've reloaded the page.
  (function (rootLink) {
    var parent = rootLink.parent();
    if (!parent.hasClass("active")) {
      parent.addClass("active");
    }
  }(angular.element("#root-link")));
}]);
