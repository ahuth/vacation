/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular, App */

angular.module("services.data").factory("employeeData", ["$http", "$q", "requestData", function ($http, $q, requestData) {
  "use strict";

  // Constructor for our Employee objects.
  function Employee(attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.hired = attributes.hired;
    this.request_ids = attributes.request_ids;
    this.group_id = attributes.group_id;
  }

  // Convert json data from the server into Employee objects.
  function processPreload(employees) {
    return employees.map(function (employee) {
      return new Employee(employee);
    });
  }

  // Internal store of all Employees.
  var data = processPreload(App.data.employees);

  // Return all Employees.
  function all() {
    return data;
  }

  // Search for and return an Employee by id.
  function find(id) {
    var output;
    // Ensure that the id is a number.
    id = Number(id);
    // Use .every() instead of .forEach() so that we can break out of the loop
    // early.
    data.every(function (employee) {
      if (employee.id === id) {
        output = employee;
        return false;
      }
      return true;
    });
    return output;
  }

  // Create a new Employee on the client and send a request to the server.
  // Returns a promise indicating if the server action was successful.
  function create(attributes) {
    var deferred = $q.defer();
    var employee = new Employee({ name: attributes.name, hired: attributes.hired, group_id: attributes.group_id, request_ids: [] });

    data.push(employee);

    $http({
      method: "POST",
      url: "/api/groups/" + employee.group_id + "/employees",
      data: { name: attributes.name, hired: attributes.hired }
    }).then(function (response) {
      // Assign the correct id from the server.
      employee.id = response.data.employee.id;

      deferred.resolve();
    }, function (response) {
      deferred.reject(response);
    });

    return deferred.promise;
  }

  // Update an employee in the client, send a server request to update it, and
  // return a promise indicating if the server action was completed.
  Employee.prototype.update = function (attributes) {
    var deferred = $q.defer();

    this.name = attributes.name;
    this.hired = attributes.hired;

    $http({
      method: "PATCH",
      url: "/api/employees/" + this.id,
      data: { name: attributes.name, hired: attributes.hired }
    }).then(function () {
      deferred.resolve();
    }, function (response) {
      deferred.reject();
    });

    return deferred.promise;
  };

  // Delete an employee from the client and send a server request. Returns a
  // promise indicating if the employee was deleted from the server.
  Employee.prototype.destroy = function () {
    var deferred;
    var index = data.indexOf(this);

    // If index is -1, then `group` is not in the data array.
    if (index < 0) {
      deferred = $q.defer();
      deferred.reject({ errors: ["Employee does not exist"] });
      return deferred.promise;
    }

    // Remove this employee's requests from the requests array, but don't send
    // server requests to delete them.
    requestData.forEmployee(this.id).forEach(function (request) {
      request.remove();
    });

    // Remove this employee from the data array.
    data.splice(index, 1);

    return $http({
      method: "DELETE",
      url: "/api/employees/" + this.id
    });
  };

  return {
    all: all,
    find: find,
    create: create
  };
}]);
