/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

// Declare the great Moment.js library as an Angular constant. This allows us
// to inject it into our directive.
angular.module("directives.calendarMonth").constant("moment", window.moment);
