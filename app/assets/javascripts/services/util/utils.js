/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular, $ */

angular.module("services.utils").factory("utils", function () {
  "use strict";

  return {
    merge: $.extend
  };
});
