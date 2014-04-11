/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("modals.employee").factory("employeeModal", ["$modal", "objectUtils", function ($modal, objectUtils) {
  "use strict";

  function open(options) {
    var defaults = {
      title: "Employee",
      name: "",
      hired: ""
    };

    var modal = $modal.open({
      templateUrl: "services/modal/employee/template.html",
      controller: "employeeModalController",
      resolve: {
        attributes: function () {
          return objectUtils.merge(defaults, options);
        }
      }
    });

    return modal.result;
  }

  return {
    open: open
  };
}]);
