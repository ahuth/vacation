/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendarMonth").directive("calendarMonth", function () {
  "use strict";
  return {
    restrict: "AE",
    templateUrl: "directives/calendar_month/template.html",
    controller: "calendarMonthController",
    transclude: true,
    scope: {
      year: "@",
      month: "@",
      events: "="
    }
  };
});
