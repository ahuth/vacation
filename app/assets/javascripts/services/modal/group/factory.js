/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.modal").factory("groupModal", ["$modal", "objectUtils", function ($modal, objectUtils) {
  "use strict";

  function open(options) {
    var defaults = {
      title: "Group",
      name: ""
    };

    var modal = $modal.open({
      templateUrl: "services/modal/group/template.html",
      controller: "groupModalController",
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
