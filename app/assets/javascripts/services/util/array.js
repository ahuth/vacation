/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular, $ */

angular.module("services.utils").factory("arrayUtils", function () {
  "use strict";

  function lastItem(array) {
    var lastIndex = array.length - 1;
    return array[lastIndex];
  }

  return {
    lastItem: lastItem
  };
});
