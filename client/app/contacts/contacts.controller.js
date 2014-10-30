'use strict';

angular.module('contactAppApp')
  .controller('ContactsCtrl', function ($scope,$location,$http) {

    $http.get('/api/contacts').then(function(res){
        $scope.contacts = res.data;
    });

    $scope.showContact = function(contact){

      $location.path('/contacts/' + contact._id);
    };

    $scope.newContact = function(){

      $http.post('/api/contacts').then(function(res){
          if(res.status == 201){
            $location.path('contacts/' +res.data[0]._id);
          }
      });

    }

    $scope.delete = function(contact,index){

      if(confirm('Are you sure you want to delete this contact?')){
        $http.delete('/api/contacts/'+ contact._id).then(function(res){
          $scope.contacts.splice(index,1);
        });
      }

    };


});
