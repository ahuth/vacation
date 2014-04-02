/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.groupsList").directive("groupsList", function () {
  "use strict";
  return {
    restrict: "AE",
    templateUrl: "directives/groups_list/template.html",
    controller: "groupsListController",
    scope: {
      group: "="
    }
  };
});
