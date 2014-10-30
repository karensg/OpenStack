'use strict';

angular.module('contactAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/contacts/:id', {
        templateUrl: 'app/contact/contact.html',
        controller: 'ContactCtrl'
      });
  });
