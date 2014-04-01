/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.employeePanel").directive("employeePanel", function () {
  "use strict";
  return {
    restrict: "AE",
    templateUrl: "directives/employee_panel/template.html",
    controller: "employeePanelController",
    scope: {
      employee: "="
    }
  };
});
