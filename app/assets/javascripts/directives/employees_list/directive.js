/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.employeesList").directive("employeesList", function () {
  "use strict";
  return {
    restrict: "AE",
    templateUrl: "directives/employees_list/template.html",
    controller: "employeesListController",
    scope: {
      employee: "=",
      group: "="
    }
  };
});
