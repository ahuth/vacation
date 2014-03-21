/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global App */

App.Application.config(["$locationProvider", function ($locationProvider) {
  "use strict";

  $locationProvider.html5Mode(true);
}]);
