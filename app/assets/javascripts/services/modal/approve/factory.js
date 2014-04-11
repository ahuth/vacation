/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("modals.approve").factory("approveModal", ["$modal", "objectUtils", function ($modal, objectUtils) {
  "use strict";

  function open(options) {
    var defaults = {
      title: "Requests",
      requests: []
    };

    var modal = $modal.open({
      templateUrl: "services/modal/approve/template.html",
      controller: "approveModalController",
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
