'use strict';

angular.module('novae')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      });
  });
