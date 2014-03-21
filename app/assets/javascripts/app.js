/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.data", []);
angular.module("services.modal", []);

angular.module("pages", ["pages.index"]);
angular.module("pages.index", ["services.data", "services.modal"]);

angular.module("app", ["templates", "ngRoute", "ui.bootstrap", "pages"]);
