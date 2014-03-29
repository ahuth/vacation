/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendar-month", []);
angular.module("directives.groups-list", ["services.data", "services.modal"]);

angular.module("pages", ["pages.index"]);
angular.module("pages.index", ["directives.calendar-month", "directives.groups-list"]);

angular.module("services.data", []);
angular.module("services.modal", ["services.utils"]);
angular.module("services.utils", []);

angular.module("app", ["templates", "ngRoute", "ui.bootstrap", "pages"]);
