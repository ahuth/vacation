/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular, App */

angular.module("services.data").factory("requestData", ["$http", "$q", function ($http, $q) {
  "use strict";

  // Constructor for our Request objects.
  function Request(attributes) {
    this.id = attributes.id;
    this.date = attributes.date;
    this.approved = attributes.approved;
    this.employee_id = attributes.employee_id;
    this.group_id = attributes.group_id;
  }

  // Convert json data from the server into Request objects.
  function processPreload(requests) {
    return requests.map(function (request) {
      return new Request(request);
    });
  }

  // Internal store of all Requests.
  var data = processPreload(App.data.requests);

  // Return all Requests.
  function all() {
    return data;
  }

  // Search for and return a Request by id.
  function find(id) {
    var output;
    // Ensure that the id is a number.
    id = Number(id);
    // Use .every() instead of .forEach() so that we can break out of the loop
    // early.
    data.every(function (request) {
      if (request.id === id) {
        output = request;
        return false;
      }
      return true;
    });
    return output;
  }

  // Create a new Request on the client and send a request to the server.
  // Returns a promise indicating if the server action was successful.
  function create(attributes) {
    var deferred = $q.defer();
    var request = new Request({ date: attributes.date, employee_id: attributes.employee_id, group_id: attributes.group_id, approved: true });

    data.push(request);

    $http({
      method: "POST",
      url: "/api/employees/" + request.employee_id + "/requests",
      data: { date: attributes.date }
    }).then(function (response) {
      // Assign the correct id from the server.
      request.id = response.data.request.id;

      deferred.resolve();
    }, function (response) {
      deferred.reject(response);
    });

    return deferred.promise;
  }

  // Get an array of all requests for a given employee id.
  function forEmployee(id) {
    return data.filter(function (request) {
      return request.employee_id === id;
    });
  }

  // Get an array of all requests for a given group id.
  function forGroup(id) {
    return data.filter(function (request) {
      return request.group_id === id;
    });
  }

  // Delete a request from the client and send a server request. Returns a
  // promise indicating if the request was deleted from the server.
  Request.prototype.destroy = function () {
    var deferred;
    var index = data.indexOf(this);

    // If index is -1, then the request is not in the data array.
    if (index < 0) {
      deferred = $q.defer();
      deferred.reject({ errors: ["Request does not exist"] });
      return deferred.promise;
    }

    // Remove the request from the data array.
    data.splice(index, 1);

    return $http({
      method: "DELETE",
      url: "/api/requests/" + this.id
    });
  };

  // Remove a request from the internal data array, but do NOT send a server
  // request to delete it.
  Request.prototype.remove = function () {
    var index = data.indexOf(this);

    // If index is -1, this request is not in the data array.
    if (index < 0) {
      return;
    }

    data.splice(index, 1);
  };

  // Toggle the approval attribute of a request. Returns a promise indicating
  // if approval was toggled on the server.
  Request.prototype.toggleApproval = function () {
    var deferred = $q.defer();

    this.approved = !this.approved;

    $http({
      method: "PATCH",
      url: "/api/requests/" + this.id + "/toggle"
    }).then(function () {
      deferred.resolve();
    }, function (response) {
      deferred.reject(response);
    });

    return deferred.promise;
  };

  return {
    all: all,
    find: find,
    create: create,
    forEmployee: forEmployee,
    forGroup: forGroup
  };
}]);
