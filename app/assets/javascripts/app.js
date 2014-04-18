/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("directives.calendarMonth", ["services.vendor"]);
angular.module("directives.calendarYear", ["directives.employeeYear", "directives.groupYear"]);
angular.module("directives.employeesList", ["modals.employee", "services.data", "services.utils"]);
angular.module("directives.employeePanel", ["modals.confirm", "modals.employee", "services.data"]);
angular.module("directives.employeeYear", ["directives.calendarMonth", "modals.request", "services.data", "services.vendor"]);
angular.module("directives.groupsList", ["modals.group", "services.data", "services.utils"]);
angular.module("directives.groupPanel", ["modals.confirm", "modals.group", "services.data"]);
angular.module("directives.groupYear", ["directives.calendarMonth", "modals.approve", "services.data", "services.vendor"]);
angular.module("directives.infoPanel", ["directives.employeePanel", "directives.groupPanel"]);

angular.module("filters.moment", ["services.vendor"]);

angular.module("modals.approve", ["services.data", "services.utils"]);
angular.module("modals.confirm", ["services.utils"]);
angular.module("modals.employee", ["services.utils"]);
angular.module("modals.group", ["services.utils"]);
angular.module("modals.request", ["filters.moment", "services.utils"]);

angular.module("pages", ["pages.index"]);
angular.module("pages.index", ["directives.calendarYear", "directives.employeesList", "directives.groupsList", "directives.infoPanel"]);

angular.module("services.data", []);
angular.module("services.utils", []);
angular.module("services.vendor", []);

angular.module("app", ["templates", "ngRoute", "ui.bootstrap", "pages"]);
