/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendarMonth", ["services.vendor"]);
angular.module("directives.groupsList", ["services.data", "services.modal"]);

angular.module("pages", ["pages.index"]);
angular.module("pages.index", ["directives.groupsList"]);

angular.module("services.data", []);
angular.module("services.modal", ["services.utils"]);
angular.module("services.utils", []);
angular.module("services.vendor", []);

angular.module("app", ["templates", "ngRoute", "ui.bootstrap", "pages"]);
