'use strict';

angular.module('contactAppApp')
  .controller('ContactsCtrl', function ($scope,$location,$http,$upload) {

    $scope.loggedIn = false;

    $http.get('/api/things/getstatus').then(function(res){
        if(res.data != 0){
          $scope.loggedIn = true;
        }
    });

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

    //import/export functions
    $scope.importContacts = function(){

      $http.get('/api/things').then(function(res){
          console.log(res);
          if(res.status == 200){
            $http.get('/api/contacts').then(function(res){
                $scope.contacts = res.data;
            });
          }else{
            alert('Error importing contacts');
          }
      });

    }

    $scope.exportContacts = function(){

      $http.post('/api/things/post').then(function(res){
          if(res.status == 200){
            alert('Google contacts exported!');
          }else{
            alert('Error exporting contacts');
          }
      });


    }

 $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      var fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = function(e) {
          $upload.http({
              url: 'upload',
              headers: {'Content-Type': file.type},
              data: e.target.result
          }).then(function(response) {
              console.log(response);
          }, null, function(evt) {
              $scope.progress[index] = parseInt(100.0 * evt.loaded / evt.total);
          });
      }
    }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  };

  
});
