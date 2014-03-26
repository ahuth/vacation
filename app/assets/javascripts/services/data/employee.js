/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular */

angular.module("services.data").factory("employeeData", ["$http", "$q", function ($http, $q) {
  "use strict";

  // Compare two employees to sort them in an array.
  function comparator(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  // Create an employee on the client, send a request to the server to create
  // one, return a promise which indicates if the server action was successful.
  function create(group, attributes) {
    var deferred = $q.defer();
    var employee = { name: attributes.name, hired: attributes.hired, requests: [] };

    group.employees.push(employee);

    $http({
      method: "POST",
      url: "/api/groups/" + group.id + "/employees",
      data: employee
    }).then(function (response) {
      // Assign the correct id from the server.
      employee.id = response.data.employee.id;

      // Alphabetize the employees.
      group.employees.sort(comparator);

      deferred.resolve();
    }, function (response) {
      deferred.reject(response);
    });

    return deferred.promise;
  }

  // Update an employee in the client, send a server request to update it, and
  // return a promise indicating if the server action was successful.
  function update(group, employee, attributes) {
    var deferred = $q.defer();

    employee.name = attributes.name;
    employee.hired = attributes.hired;

    // Alphabetize the employees.
    group.employees.sort(comparator);

    $http({
      method: "PATCH",
      url: "/api/employees/" + employee.id,
      data: { name: attributes.name, hired: attributes.hired }
    }).then(function (response) {
      deferred.resolve();
    }, function (response) {
      deferred.reject(response);
    });

    return deferred.promise;
  }

  // Delete an employee from the client, send a server request to delete it,
  // and return a promise indicating if the server action was successful.
  function destroy(group, employee) {
    var deferred = $q.defer();
    var employees = group.employees;
    var index = employees.indexOf(employee);

    // index will be -1 if `group` is not found in the array. If that's the
    // case, reject the promise with an error. Otherwise, delete it.
    if (index < 0) {
      deferred.reject({ errors: ["Employee does not exist"] });
    } else {
      deferred = null;
      employees.splice(index, 1);

      return $http({
        method: "DELETE",
        url: "/api/employees/" + employee.id
      });
    }

    return deferred.promise;
  }

  return {
    create: create,
    update: update,
    destroy: destroy
  };
}]);
