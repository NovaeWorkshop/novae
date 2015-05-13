'use strict';

angular.module('novae', [
  'ui.router'
])
  .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

  });
