'use strict';

angular.module('contactAppApp')
  .controller('ContactCtrl', function ($scope,$routeParams,$http,$route) {

    $http.get('/api/contacts/' + $routeParams.id).then(function(res){
        $scope.contact = res.data;
    });

    $scope.saveContact = function(){
      var data = $('#editForm').serializeJSON();
      delete data._id;
      console.log(data);

      $http.put('/api/contacts/' + $routeParams.id, data).then(function(res){
        console.log(res);
      });
    };

    $scope.addField = function(){

      var fieldName = prompt('New field name:');
      fieldName = slug(fieldName);
      var data = {};
      data[fieldName] = '';
      $http.put('/api/contacts/' + $routeParams.id, data).then(function(res){
        console.log(res);
        $route.reload();
      });

    }

    var slug = function(str) {
      var $slug = '';
      var trimmed = $.trim(str);
      $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
      replace(/-+/g, '-').
      replace(/^-|-$/g, '');
      return $slug.toLowerCase();
    }




  });
