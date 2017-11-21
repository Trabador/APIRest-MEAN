var app = angular.module("API",[]);

app.controller("generalCtrl", function($scope, $http){
    $scope.products = [];
    $scope.product = null;
    $scope.action = 'Agregar';

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
            .then(function success (res){
                console.log(res);
                //reload page
                window.location.reload();
            },
            function error (res){
                console.log(res);
            }
        );
    };

    $scope.sendData = function(){
        if ($scope.product._id == null){
            var url = 'http://localhost:8080/api/Product/';
            addProduct(url);
        }
        else{
            var url = 'http://localhost:8080/api/Product/'+$scope.product._id;
            updateProduct(url);
        }    
    };

    $scope.updateThisProduct = function(id){
        var url = 'http://localhost:8080/api/Product/'+id;
        $http.get(url)
            .then(function success (res){
                    console.log(res);
                    $scope.action = 'Actualizar';
                    $scope.product = res.data.message;
                },
                function error (res){
                    console.log(res);
                    $scope.product = null;
                }
        );
    };

    function addProduct(url){
        console.log($scope.product);
        $http.post(url, $scope.product)
            .then(function success (res){
                console.log(res);
                //reload page
                window.location.reload();
            },
            function error (res){
                console.log(res);
            }
        );
        $scope.product = {};
    };

    function updateProduct(url){
        console.log($scope.product);
        $http.put(url, $scope.product)
            .then(function success (res){
                console.log(res);
                //reload page
                $scope.action = 'Agregar';
                window.location.reload();
            },
            function error (res){
                console.log(res);
            }
        );
        $scope.product = {};

    };

});