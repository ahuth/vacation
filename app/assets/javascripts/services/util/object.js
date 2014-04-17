/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular, $ */

angular.module("services.utils").factory("objectUtils", function () {
  "use strict";

  // Merge two objects together. The first argument to merge should be the
  // object that will receive new properties. Any additional arguments will
  // have their properties merged in to the first.
  function merge() {
    var args = Array.prototype.slice.call(arguments);
    // In jQuery, merge is called `extend`.
    return $.extend.apply(null, args);
  }

  return {
    merge: merge
  };
});
