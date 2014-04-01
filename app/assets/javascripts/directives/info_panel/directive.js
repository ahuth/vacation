/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.infoPanel").directive("infoPanel", function () {
  "use strict";
  return {
    restrict: "AE",
    templateUrl: "directives/info_panel/template.html",
    controller: "infoPanelController",
    scope: {
      group: "=",
      employee: "="
    }
  };
});
