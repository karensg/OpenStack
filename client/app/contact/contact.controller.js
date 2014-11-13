'use strict';

angular.module('contactAppApp')
  .controller('ContactCtrl', function ($scope,$routeParams,$http,$route,$upload) {

    $http.get('/api/contacts/' + $routeParams.id).then(function(res){
        $scope.contact = res.data;

        if(!$scope.contact.email){
          $scope.contact.email = '';
        }
        if(!$scope.contact.firstName){
          $scope.contact.firstName = '';
        }
        if(!$scope.contact.lastName){
          $scope.contact.lastName = '';
        }
        if(!$scope.contact.imgUrl){
          $scope.contact.imgUrl = '';
        }
        if(!$scope.contact.thumbUrl){
          $scope.contact.thumbUrl = '';
        }

    });

    $scope.saveContact = function(){
      var data = $('#editForm').serializeJSON();
      delete data._id;
      console.log(data);

      $http.put('/api/contacts/' + $routeParams.id, data).then(function(res){
        if(res.status == 204){
          alert('Contact saved');
        }else{
          alert('Error saving contact');
        }

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

    };

    $scope.addImage = function(){

      var fileInput = document.getElementById("imageInput");
      var file = fileInput.files[0];
      $scope.upload = $upload.upload({
        url: '/api/contacts/' + $scope.contact._id + '/image', //upload.php script, node.js route, or servlet url
        method: 'POST',
        file: file, // or list of files ($files) for html5 only
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        console.log(data);
        // file is uploaded successfully
        var thumb = data.thumbUrl;
        var img = data.imgUrl;
        $scope.contact.imgUrl = img;
        $scope.contact.thumbUrl = thumb;

      });
    };


    var slug = function(str) {
      var $slug = '';
      var trimmed = $.trim(str);
      $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
      replace(/-+/g, '-').
      replace(/^-|-$/g, '');
      return $slug.toLowerCase();
    }




  });
