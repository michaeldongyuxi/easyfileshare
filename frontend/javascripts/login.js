var app = angular.module('login', []);

app.controller('LoginCtrl', function ($scope, $http) {
  
  $scope.username = "";
  $scope.password = "";
  $scope.error = false;

  $scope.submit = function(){
    if($scope.username === ""){
      $scope.error = true;
      $scope.errorMessage = "Please enter your username";
      return;
    }
    else if($scope.password === ""){
      $scope.error = true;
      $scope.errorMessage = "Please enter your password";
      return;   
    }
    else {
      console.log("entered submit");   
      var login = {email: $scope.username, password: $scope.password};
      console.log("login created");   
      console.log(login.email);
      console.log(login.password);
      $http.post('/login', login).then(function successCallback(response){
        console.log("success");   
        console.log(response);
        if(response.data.success === true){
          sessionStorage.setItem('username', $scope.username);
          window.location.href = "/groups.html";
        }
        else {
          $scope.error = true;        
          $scope.errorMessage = "Incorrect username or password";
        }

      }, function errorCallback(response){
        console.log("error");
      });
    }
  }
});