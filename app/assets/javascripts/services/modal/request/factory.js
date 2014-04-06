/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.modal").factory("requestModal", ["$modal", "objectUtils", function ($modal, objectUtils) {
  "use strict";

  function open(options) {
    var defaults = {
      title: "Request these days?"
    };

    var modal = $modal.open({
      templateUrl: "services/modal/request/template.html",
      controller: "requestModalController",
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
