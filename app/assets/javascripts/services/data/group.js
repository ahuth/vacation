/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular, App */

angular.module("services.data").factory("groupData", ["$http", "$q", function ($http, $q) {
  "use strict";

  // Constructor for our Group objects.
  function Group(attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.employee_ids = attributes.employee_ids;
  }

  // Convert json data from the server into Group objects.
  function processPreload(groups) {
    return groups.map(function (group) {
      return new Group(group);
    });
  }

  // Internal store of all Groups.
  var data = processPreload(App.data.groups);

  // Return all Groups.
  function all() {
    return data;
  }

  // Search for and return a Group by id.
  function find(id) {
    var output;
    // Ensure that the id is a number.
    id = Number(id);
    // Use .every() instead of .forEach() so that we can break out of the loop
    // early.
    data.every(function (group) {
      if (group.id === id) {
        output = group;
        return false;
      }
      return true;
    });
    return output;
  }

  // Create a new Group on the client and send a request to the server. Returns
  // a promise indicating if the server action was successful.
  function create(attributes) {
    var deferred = $q.defer();

    // Create a new group with no id and no employees. The id will be filled in
    // once the server responds.
    var group = new Group({ name: attributes.name, employee_ids: [] });
    data.push(group);

    $http({
      method: "POST",
      url: "/api/groups",
      data: { name: attributes.name }
    }).then(function (response) {
      // Assign the correct id from the server.
      group.id = response.data.group.id;

      deferred.resolve();
    }, function (response) {
      deferred.reject(response);
    });

    return deferred.promise;
  }

  // Update a group in the client, send a server request to update it, and
  // return a promise indicating if the server action was completed.
  Group.prototype.update = function (attributes) {
    var deferred = $q.defer();

    this.name = attributes.name;

    $http({
      method: "PATCH",
      url: "/api/groups/" + this.id,
      data: { name: attributes.name }
    }).then(function () {
      deferred.resolve();
    }, function (response) {
      deferred.reject(response);
    });

    return deferred.promise;
  };

  // Delete a group from the client and send a server request. Returns a
  // promise indicating if the group was deleted from the server.
  Group.prototype.destroy = function () {
    var deferred;
    var index = data.indexOf(this);

    // If index is -1, then `group` is not in the data array.
    if (index < 0) {
      deferred = $q.defer();
      deferred.reject({ errors: ["Group does not exist"] });
      return deferred.promise;
    }

    // Remove the group from the data array.
    data.splice(index, 1);

    return $http({
      method: "DELETE",
      url: "/api/groups/" + this.id
    });
  };

  return {
    all: all,
    find: find,
    create: create
  };
}]);
