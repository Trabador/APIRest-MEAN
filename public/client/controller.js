var app = angular.module("API",[]);

app.controller("generalCtrl", function($scope, $http){
    $scope.products = [];

    $http.get('http://localhost:8080/api/Product/')
        .then(function(res){
            $scope.products = res.data.message;
        })
        .catch();
});