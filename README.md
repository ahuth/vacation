# Vacation

An employee vacation day tracking web app. It is a single-page webapp that uses
[Rails](http://rubyonrails.org/) and [AngularJS](https://angularjs.org/). Code is
organized in a modular way and makes heavy use of unit tests.

![Screenshot](https://cloud.githubusercontent.com/assets/2503289/3176158/4504421e-ec02-11e3-88af-caa91f2f9997.png)

## Table of Contents

* [Installation](#installation)
* [Goals](#goals)
* [Concepts](#concepts)
  * [Code organization](#code-organization)
  * [Selecting dates](#selecting-dates)
  * [Updating the url](#updating-the-url)
* [Tests](#tests)

## Installation

First, you must have rails installed. This can be done with

    gem install rails

Then, clone or download this project. From the project directory, install its
gems with

    bundle install

From there, run `rails server` and navigate a web browser to `localhost:8000`.

## Goals

Managers with a large number of employees (50-100) need a better way to track and
manage vacation day requests then using Excel spreadsheets. This app aims to solve
that.

It should be easy to add and edit people's information. It should also be easy to
add an entire year's worth of vacation days to the app for each employee. Finally,
there should be an easy way to see who has requested any given day off.

This app achieves these goals by basing its user interface around interacting
directly with a calendar. Adding days, removing days, or managing the requests for
a given day are as simple as clicking on a calendar.

## Concepts

### Code organization

For the client-side part of the app, Vacation makes heavy use of AngularJS's modules and
dependency injection system.
All modules are defined first with their depdencies ([link](https://github.com/ahuth/vacation/blob/master/app/assets/javascripts/app.js))
Then, controllers, directives, filters, and services are defined for each module as
needed ([example](https://github.com/ahuth/vacation/tree/master/app/assets/javascripts/directives/calendar_month))

Modules are not organized by type, but by function. This means that there is not a module
for controllers, a module for services, and a module for directives. Instead, there is
a module for each piece of functionality (for example, a [calendar month](https://github.com/ahuth/vacation/tree/master/app/assets/javascripts/directives/calendar_month))

### Selecting dates

It is necessary for the user to be able to add an entire year's worth of dates for each
employee very efficiently. This is handled by using a delay when a day on the calendar
is [clicked on](https://github.com/ahuth/vacation/blob/master/app/assets/javascripts/directives/employee_year/controller.js#L171),
allowing the user to click on as many days as they want before processing this list of dates.

By doing this, the user can select as request as many or as few days as she wants when
requesting vacation days.

![Selecting dates](https://cloud.githubusercontent.com/assets/2503289/3176157/44fbdf52-ec02-11e3-88f4-071d34345619.png)

### Updating the url

Vacation is a single page app, allowing it to be very quick and responsive. We still
want to update the url when using different parts of the app, so that the user can
bookmark different pages. This is accomplished with a two step process.

First, we have a service that gives us a [skipNextReload](https://github.com/ahuth/vacation/blob/master/app/assets/javascripts/services/route/route.js)
method. This service is used when changing the group or employee before [updating the url](https://github.com/ahuth/vacation/blob/f1318b927b5dc0e8256c409481a545d720d5382a/app/assets/javascripts/pages/index/controller.js#L22),
and prevents Angular from initating a route change and reloading the controller and template.

Second, if the employee or group id is present as a route param when the app loads, then
we [set the correct employee/group](https://github.com/ahuth/vacation/blob/f1318b927b5dc0e8256c409481a545d720d5382a/app/assets/javascripts/pages/index/controller.js#L7).
This lets us load the app into the correct state from a bookmark or page refresh.

## Tests

To run tests, go to the project directory and run `rake test`.
