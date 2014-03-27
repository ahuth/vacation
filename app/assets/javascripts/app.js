/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("components.groups", ["services.data", "services.modal"]);

angular.module("pages", ["pages.index"]);
angular.module("pages.index", ["components.groups"]);

angular.module("services.data", []);
angular.module("services.modal", ["services.utils"]);
angular.module("services.utils", []);

angular.module("app", ["templates", "ui.router", "ui.bootstrap", "pages"]);
