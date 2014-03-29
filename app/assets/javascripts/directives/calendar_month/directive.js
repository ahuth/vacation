/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendar-month").directive("calendarMonth", function () {
  "use strict";
  return {
    restrict: "AE",
    templateUrl: "directives/calendar_month/template.html",
    controller: "calendarMonthController",
    scope: {
      year: "@",
      month: "@"
    }
  };
});
