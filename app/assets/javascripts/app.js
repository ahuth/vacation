/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendarMonth", ["services.vendor"]);
angular.module("directives.calendarYear", ["directives.calendarMonth", "services.data", "services.vendor"]);
angular.module("directives.employeesList", ["services.data", "services.modal"]);
angular.module("directives.employeePanel", ["services.data", "services.modal"]);
angular.module("directives.groupsList", ["services.data", "services.modal"]);

angular.module("pages", ["pages.index"]);
angular.module("pages.index", ["directives.calendarYear", "directives.employeesList", "directives.groupsList"]);

angular.module("services.data", []);
angular.module("services.modal", ["services.utils"]);
angular.module("services.utils", []);
angular.module("services.vendor", []);

angular.module("app", ["templates", "ngRoute", "ui.bootstrap", "pages"]);
