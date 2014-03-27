/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("utils", []);

angular.module("services.data", []);
angular.module("services.modal", ["utils"]);

angular.module("pages", ["pages.index"]);
angular.module("pages.index", ["services.data", "services.modal"]);

angular.module("app", ["templates", "ui.router", "ui.bootstrap", "pages"]);
