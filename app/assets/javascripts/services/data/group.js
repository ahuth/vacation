/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular, App */

angular.module("services.data").factory("groupData", ["$http", "$q", "employeeData", function ($http, $q, employeeData) {
  "use strict";

  // Constructor for our Group objects.
  function Group(name, employee_ids, id) {
    this.id = id;
    this.name = name;
    this.employees = employee_ids.map(function (id) {
      return employeeData.find(id);
    });
  }

  // Convert json data from the server into Group objects.
  function processPreload(groups) {
    return groups.map(function (group) {
      return new Group(group.name, group.employee_ids, group.id);
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
    var group = new Group(attributes.name, []);
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
    this.name = attributes.name;

    return $http({
      method: "PATCH",
      url: "/api/groups/" + this.id,
      data: { name: attributes.name }
    });
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
