/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.employeeYear").directive("employeeYear", function () {
  "use strict";
  return {
    restrict: "AE",
    templateUrl: "directives/employee_year/template.html",
    controller: "employeeYearController",
    scope: {
      year: "@",
      requestsDirty: "=",
      employee: "="
    }
  };
});
