/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular, $ */

angular.module("app").config(["$httpProvider", function ($httpProvider) {
  "use strict";

  var csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
  $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
}]);
