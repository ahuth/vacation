# Vacation
[![Run on Repl.it](https://repl.it/badge/github/ahuth/vacation)](https://repl.it/github/ahuth/vacation)
An employee vacation day tracking web app. It is a single-page webapp that uses
[Rails](http://rubyonrails.org/) and [AngularJS](https://angularjs.org/). The Rails
part is a server API and handles authentication/authorization.

The AngularJS part is the user interface that allows the user to manage vacation days
by interacting directly with a calendar. And the best part is, because the Angular app
never waits on the server, it is very fast and responsive.

![Screenshot](https://cloud.githubusercontent.com/assets/2503289/3176158/4504421e-ec02-11e3-88af-caa91f2f9997.png)

## Table of Contents

* [Installation](#installation)
* [Goals](#goals)
* [Concepts](#concepts)
  * [Preloading data](#preloading-data)
  * [Code organization](#code-organization)
  * [Selecting dates](#selecting-dates)
  * [Updating the url](#updating-the-url)
* [Tests](#tests)

## Installation

First, install Rails with `gem install rails`. Then, clone or download the
project. From the project directory, run `bundle install`. Finally, run
`rails server` and navigate your browser to `localhost:8000`.

## Goals

The are 3 main goals of this project. It should be easy to:

1. Add and edit people's information.
2. Add vacation day requests to the app for each employee
3. See who has requested any given day off

This app achieves these goals by basing its user interface around interacting
directly with a calendar. Adding days, removing days, or managing the requests for
a given day are as simple as clicking on a calendar.

## Concepts

### Preloading data

When the app loads, Rails [creates a data preload](https://github.com/ahuth/vacation/blob/master/app/controllers/main_controller.rb).
This preload is [inserted](https://github.com/ahuth/vacation/blob/master/app/views/main/index.html.erb)
into the AngularJS app. AngularJS uses this preload to create its own [data models](https://github.com/ahuth/vacation/blob/master/app/assets/javascripts/services/data/group.js#L22).

### Code organization

For the client-side part of the app, Vacation makes heavy use of AngularJS's modules and
dependency injection system.
All modules are [defined first with their depdencies](https://github.com/ahuth/vacation/blob/master/app/assets/javascripts/app.js).
Then, controllers, directives, filters, and services are [added to each module](https://github.com/ahuth/vacation/tree/master/app/assets/javascripts/directives/calendar_month).

### Selecting dates

It is necessary for the user to be able to add an entire year's worth of dates for each
employee very efficiently. This is handled by using a delay when a day on the calendar
is [clicked on](https://github.com/ahuth/vacation/blob/master/app/assets/javascripts/directives/employee_year/controller.js#L171),
allowing the user to click on as many days as they want before processing this list of dates.

By doing this, the user can select or request as many days as she wants when making
requests.

![Selecting dates](https://cloud.githubusercontent.com/assets/2503289/3176157/44fbdf52-ec02-11e3-88f4-071d34345619.png)

### Updating the url

Vacation is a single page app, allowing it to be very quick and responsive. We still
want to update the url when using different parts of the app, so the user can
bookmark different pages. This is accomplished with a two step process.

First, we have a service that gives us a [skipNextReload](https://github.com/ahuth/vacation/blob/master/app/assets/javascripts/services/route/route.js)
method. This service is used when [changing the group or employee](https://github.com/ahuth/vacation/blob/f1318b927b5dc0e8256c409481a545d720d5382a/app/assets/javascripts/pages/index/controller.js#L22),
and prevents Angular from initating a route change and reloading the controller and template.

Second, if the employee or group id is present as a route parameter when the app loads,
we [set the correct employee/group](https://github.com/ahuth/vacation/blob/f1318b927b5dc0e8256c409481a545d720d5382a/app/assets/javascripts/pages/index/controller.js#L7).
This lets us load the app into the correct state from a bookmark or page refresh.

## Tests

Vacation uses tests to speed up development and to make the app more likely to be
correct. To run the tests, go to the project directory and run `rake test`.
