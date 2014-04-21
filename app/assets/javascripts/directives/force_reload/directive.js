/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

// Use this directive on an anchor element to force it to reload the browser
// when clicked.
angular.module("directives.forceReload").directive("forceReload", function () {
  "use strict";
  return {
    restrict: "A",
    link: function (scope, elem, attrs) {
      // Set a 'target' attribute on the link to '_self'. This causes Angular
      // to do a full page reload when it's clicked.
      elem.attr("target", "_self");
    }
  };
});
