/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular, App */

angular.module("services.data").factory("groupData", ["$http", "$q", function ($http, $q) {
  "use strict";

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

  // Internal data cache, alphabetized.
  var data = App.data.groups.sort(comparator);

  // Determine if a name has already been taken.
  function isUniqueName(name) {
    return data.every(function (element, index) {
      return element.name.toLowerCase() !== name.toLowerCase();
    });
  }

  // Determine if a group name is valid or not.
  function isValid(name) {
    if (name && isUniqueName(name)) {
      return true;
    }
    return false;
  }

  // Return data for all of the groups.
  function all() {
    return data;
  }

  // Create a group in the client, send a request to the server to create a new
  // one, and return a promise indicating if the server action was completed.
  function create(name) {
    var deferred = $q.defer();

    // If the created group will not be valid, reject the promise and exit
    // early.
    if (!isValid(name)) {
      deferred.reject({ errors: ["Invalid name"] });
      return deferred.promise;
    }

    data.push({ name: name });

    $http({
      method: "POST",
      url: "/api/groups",
      data: { name: name }
    }).then(function (response) {
      // Assign the correct id from the server.
      data[data.length - 1].id = response.data.group.id;

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
  function update(id, options) {
    var deferred = $q.defer();

    if (!isValid(options.name)) {
      deferred.reject();
      return deferred.promise;
    }

    // Find the group we want to edit. Use an `every` loop instead of
    // `forEach` so that we can break out of the loop once we've found the
    // group.
    data.every(function (group, index) {
      if (group.id === id) {
        if (options.name && options.name !== group.name) {
          data[index].name = options.name;
        }
        return false;
      }
      return true;
    });

    // Alphabetize the groups.
    data.sort(comparator);

    // Make the server request and return a promise, but only if we actually
    // modified a group.
    $http({
      method: "PATCH",
      url: "/api/groups/" + id,
      data: { name: options.name }
    }).then(function () {
      deferred.resolve();
    }, function (response) {
      deferred.reject(response);
    });

    return deferred.promise;
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
