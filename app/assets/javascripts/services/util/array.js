/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular, $ */

angular.module("services.utils").factory("arrayUtils", function () {
  "use strict";

  // Return the last item in an array.
  function lastItem(array) {
    if (array.length < 1) {
      return;
    }
    var lastIndex = array.length - 1;
    return array[lastIndex];
  }

  return {
    lastItem: lastItem
  };
});
