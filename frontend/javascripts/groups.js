var app = angular.module('groups', []);

app.factory('groupsFactory', function($http){
  var getData = function(){
    var username = sessionStorage.getItem('username');
    var queryLink = '/get_groups/' + username; 

    return $http.get(queryLink).then(function(result){
      return result.data;
    });  
  }

  return { getData: getData };
});

app.controller('GroupsCtrl', function ($scope, groupsFactory) {
  
  var groupsPromise = groupsFactory.getData();

  $scope.counter = 0;

  $scope.countUp = function(){
    $scope.counter++;
    return $scope.counter;
  }

  $scope.groupSelected = false;
  $scope.selectedGroup = null;
  $scope.files = [];
  $scope.groups = [];
  $scope.username = sessionStorage.getItem('username');

  groupsPromise.then(function(result) {
    console.log("promise completed");
    var data = result;
    console.log(result);

    console.log("pushing" + data[0].group_name + "to groups");
    for(var i = 0; i < data.length; i++){
      $scope.groups.push(data[i]); 
      console.log("pushing" + data[i] + "to groups")
    }

  });

  // file schema: file_id, path, original_name, uploaded_on
  $scope.getFiles = function(groupname){
    $scope.groupSelected = true;
    $scope.selectedGroup = groupname;

    // var returnIndex = findGroup(groupname);

    $scope.files = $scope.selectedGroup.files;
    console.log($scope.files);

  }

  function findGroup(groupname){
    for(var i = 0; i < $scope.groups.length; i++){
      if($scope.groups[i].group_name == groupname){
        return i;
      }
    }

    return 0;
  }

});