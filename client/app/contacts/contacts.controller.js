'use strict';

angular.module('contactAppApp')
  .controller('ContactsCtrl', function ($scope,$location) {

    /*$http.get('/api/contacts').then(function(res){
          $scope.contacts = res.data;
    });*/

    $scope.contacts = angular.fromJson([
    {
        "_id": "544e1b0cb2aa96c4654da18b",
        "firstName": "Ruud",
        "lastName": "Visser",
        "email": "visser@gmail.com",
        "mobile": "064512145"
    },
    {
        "_id": "545282387f2fe0be68eb2953",
        "firstName": "Ruud",
        "lastName": "Visser",
        "email": "visser@gmail.com",
        "mobile": "064512145"
    },
    {
        "_id": "545287d07f2fe0be68eb2954",
        "firstName": "Karens",
        "lastName": "Grigro",
        "email": "yetti4@gmail.com",
        "mobile": "0612323435"
    },
    {
        "_id": "545287df7f2fe0be68eb2955",
        "firstName": "Jan",
        "lastName": "Grigro",
        "email": "jantje@gmail.com"
    },
    {
        "_id": "545287e87f2fe0be68eb2956",
        "firstName": "Jan",
        "lastName": "van de Kerkhof",
        "email": "jantje@gmail.com"
    }]);

    $scope.showContact = function(contact){
      $location.path('/contacts/' + contact._id);
    };
});
