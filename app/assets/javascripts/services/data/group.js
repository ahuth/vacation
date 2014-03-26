/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular, App */

angular.module("services.data").factory("groupData", ["$http", "$q", function ($http, $q) {
  "use strict";

  var data = App.data.groups;

  // Compare two 'groups' to alphabetize them in an array.
  function comparator(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  // Return data for all of the groups.
  function all() {
    return data;
  }

  // Create a group in the client, send a request to the server to create a new
  // one, and return a promise indicating if the server action was completed.
  function create(attributes) {
    var deferred = $q.defer();

    var group = { name: attributes.name, employees: [] };
    data.push(group);

    $http({
      method: "POST",
      url: "/api/groups",
      data: { name: attributes.name }
    }).then(function (response) {
      // Assign the correct id from the server.
      group.id = response.data.group.id;

      // Alphabetize the groups.
      data.sort(comparator);

      deferred.resolve();
    }, function (response) {
      deferred.reject(response);
    });

    return deferred.promise;
  }

  // Update a group in the client, send a server request to update it, and
  // return a promise indicating if the server action was completed.
  function update(group, attributes) {
    var deferred = $q.defer();

    group.name = attributes.name;

    // Alphabetize the groups.
    data.sort(comparator);

    // Make the server request and return a promise, but only if we actually
    // modified a group.
    $http({
      method: "PATCH",
      url: "/api/groups/" + group.id,
      data: { name: attributes.name }
    }).then(function () {
      deferred.resolve();
    }, function (response) {
      deferred.reject(response);
    });

    return deferred.promise;
  }

  // Delete a group from the client, send a server request to delete it, and
  // return a promise indicating if the server action was completed.
  function destroy(group) {
    var deferred = $q.defer();

    var index = data.indexOf(group);

    // index will be -1 if `group` is not found in the array. If that's the
    // case, reject the promise with an error. Otherwise, delete it.
    if (index < 0) {
      deferred.reject({ errors: ["Group does not exist"] });
    } else {
      deferred = null;
      data.splice(index, 1);

      return $http({
        method: "DELETE",
        url: "/api/groups/" + group.id
      });
    }

    return deferred.promise;
  }

  return {
    all: all,
    create: create,
    update: update,
    destroy: destroy
  };
}]);
