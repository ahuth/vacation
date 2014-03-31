/*jslint vars: true, browser: true , nomen: true, indent: 2*/
/*global angular, App */

angular.module("services.data").factory("employeeData", ["$http", "$q", function ($http, $q) {
  "use strict";

  // Constructor for our Employee objects.
  function Employee(name, hired, request_ids, id) {
    this.id = id;
    this.name = name;
    this.hired = hired;
    this.requests = [];
  }

  // Convert json data from the server into Employee objects.
  function processPreload(employees) {
    return employees.map(function (employee) {
      return new Employee(employee.name, employee.hired, employee.request_ids, employee.id);
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
  function create(group, attributes) {
    var deferred = $q.defer();
    var employee = new Employee(attributes.name, attributes.hired, []);

    data.push(employee);
    group.employees.push(employee);

    $http({
      method: "POST",
      url: "/api/groups/" + group.id + "/employees",
      data: employee
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
    this.name = attributes.name;
    this.hired = attributes.hired;

    return $http({
      method: "PATCH",
      url: "/api/employees/" + this.id,
      data: { name: attributes.name, hired: attributes.hired }
    });
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

    // Remove the group from the data array.
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
