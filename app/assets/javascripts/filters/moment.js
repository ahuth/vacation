/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("filters.moment").filter("moment", function () {
  "use strict";
  return function (input, format) {
    return input.format(format);
  };
});
