/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular, App */

angular.module("services.data").factory("groupData", ["$http", "$q", function ($http, $q) {
  "use strict";

  var data = App.data.groups;

  // Return data for all of the groups.
  function all() {
    return data;
  }

  // Create a group in the client, send a request to the server to create a new
  // one, and return a promise indicating if the server action was completed.
  function create(name) {
    var deferred = $q.defer();
    data.push({ name: name });

    $http({
      method: "POST",
      url: "/api/groups",
      data: { name: name }
    }).then(function (response) {
      // Assign the correct id from the server.
      data[data.length - 1].id = response.data.group.id;
      deferred.resolve();
    }, function (response) {
      deferred.reject(response);
    });

    return deferred.promise;
  }

  // Update a group in the client, send a server request to update it, and
  // return a promise indicating if the server action was completed.
  function update(id, options) {
    var modified = false;
    // Find the group we want to edit. Use an `every` loop instead of
    // `forEach` so that we can break out of the loop once we've found the
    // group.
    data.every(function (group, index) {
      if (group.id === id) {
        if (options.name && options.name !== group.name) {
          data[index].name = options.name;
          modified = true;
        }
        return false;
      }
      return true;
    });

    // Make the server request and return a promise, but only if we actually
    // modified a group.
    if (modified) {
      return $http({
        method: "PATCH",
        url: "/api/groups/" + id,
        data: { name: options.name }
      });
    }
  }

  // Delete a group from the client, send a server request to delete it, and
  // return a promise indicating if the server action was completed.
  function destroy(id) {
    var deleted = false;
    // Find the group we want to delete. Use `every` instead of `forEach` so
    // that we can break out of the loop early.
    data.every(function (group, index) {
      if (group.id === id) {
        data.splice(index, 1);
        deleted = true;
        return false;
      }
      return true;
    });

    // Make the server request and return a promise, but only if we found the
    // group we want to delete.
    if (deleted) {
      return $http({ method: "DELETE", url: "/api/groups/" + id});
    }
  }

  return {
    all: all,
    create: create,
    update: update,
    destroy: destroy
  };
}]);
