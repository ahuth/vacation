/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendarMonth", ["services.vendor"]);
angular.module("directives.calendarYear", ["directives.employeeYear", "directives.groupYear"]);
angular.module("directives.employeesList", ["services.data", "services.modal", "services.utils"]);
angular.module("directives.employeePanel", ["services.data", "services.modal"]);
angular.module("directives.employeeYear", ["directives.calendarMonth", "services.data", "services.modal", "services.vendor"]);
angular.module("directives.groupsList", ["services.data", "services.modal", "services.utils"]);
angular.module("directives.groupPanel", ["services.data", "services.modal"]);
angular.module("directives.groupYear", ["directives.calendarMonth", "services.data", "services.modal", "services.vendor"]);
angular.module("directives.infoPanel", ["directives.employeePanel", "directives.groupPanel"]);

angular.module("modals.approve", ["services.data", "services.utils"]);
angular.module("modals.confirm", ["services.utils"]);
angular.module("modals.employee", ["services.utils"]);
angular.module("modals.group", ["services.utils"]);
angular.module("pages", ["pages.index"]);
angular.module("pages.index", ["directives.calendarYear", "directives.employeesList", "directives.groupsList", "directives.infoPanel"]);

angular.module("services.data", []);
angular.module("services.modal", ["services.data", "services.utils"]);
angular.module("services.utils", []);
angular.module("services.vendor", []);

angular.module("app", ["templates", "ngRoute", "ui.bootstrap", "pages"]);
