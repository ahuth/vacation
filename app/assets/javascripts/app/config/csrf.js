/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global App, $ */

App.Application.config(["$httpProvider", function ($httpProvider) {
  "use strict";

  var csrfToken = $("meta[name=\"csrf-token\"]").attr("content");
  $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
}]);
