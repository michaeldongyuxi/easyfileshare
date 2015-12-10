var app = angular.module('register', []);

app.controller('RegisterCtrl', function ($scope, $http) {
  
  $scope.username = "";
  $scope.password = "";
  $scope.passwordConfirm = "";
  $scope.error = false;
  $scope.errorMessage = "";

  $scope.submit = function(){
    console.log("Entered submit function");

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
    else if($scope.passwordConfirm === ""){
      $scope.error = true;
      $scope.errorMessage = "Please re-enter your password";
      return;   
    }
    else if($scope.passwordConfirm != $scope.password){
      $scope.error = true;
      $scope.errorMessage = "Passwords do not match";
      return;   
    }
    var login = {email: $scope.username, password: $scope.password};
    console.log("created login");

    $http.post('/register', login).then(function successCallback(response){
      console.log("success");     
        if(response.data.success === true){
          sessionStorage.setItem('username', $scope.username);
          window.location.href = "/groups.html";
        }
        else {
          $scope.error = true;        
          $scope.errorMessage = "Username is taken";
        }

    }, function errorCallback(response){
      console.log("error");
        $scope.error = true;        
        $scope.errorMessage = "Username is taken";
    });
  }
});