/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.groupYear").directive("groupYear", function () {
  "use strict";
  return {
    restrict: "AE",
    templateUrl: "directives/group_year/template.html",
    controller: "groupYearController",
    scope: {
      year: "@",
      requestsDirty: "=",
      group: "="
    }
  };
});
