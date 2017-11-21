var app = angular.module("API",[]);

app.controller("generalCtrl", function($scope, $http){
    $scope.products = [];

    var req = {
        method: 'GET',
        url: 'http://localhost:8080/api/Product/'
    };

    $http(req)
        .then(function succes (res){
                $scope.products = res.data.message;
            },
            function error (res){
                console.log(res);
                $scope.products = [];
            }
        );

    $scope.deleteThisProduct = function(id){
        var req = {
            method: 'DELETE',
            url: 'http://localhost:8080/api/Product/'+id
        };

        $http(req)
            .then(function succes (res){
                console.log(res);
                //reload page
                window.location.reload();
            },
            function error (res){
                console.log(res);
            }
        );
    };

});