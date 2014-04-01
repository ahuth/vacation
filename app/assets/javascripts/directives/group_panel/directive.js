/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.groupPanel").directive("groupPanel", function () {
  "use strict";
  return {
    restrict: "AE",
    templateUrl: "directives/group_panel/template.html",
    controller: "groupPanelController",
    scope: {
      group: "="
    }
  };
});
