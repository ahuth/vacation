/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("pages", ["pages.groups"]);
angular.module("pages.groups", []);

angular.module("app", ["templates", "ngRoute", "ui.bootstrap", "pages"]);
