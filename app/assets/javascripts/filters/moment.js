/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("filters.moment").filter("moment", ["moment", function (moment) {
  "use strict";
  return function (input, format) {
    return moment(input).format(format);
  };
}]);
