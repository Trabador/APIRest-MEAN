var app = angular.module("API", ['ui.bootstrap']);

app.controller("generalCtrl", function($scope, $http, $window){
    $scope.products = [];
    $scope.product = null;
    $scope.aux = null;
    $scope.action = 'Agregar';
    $scope.alert = {
        type: null,
        message: null
    };

    console.log($scope.alert);

    var url = 'http://localhost:8080/api/Product/';

    $http.get(url)
        .then(function succes (res){
                $scope.products = res.data.message;
            },
            function error (res){
                console.log(res);
                $scope.products = [];
            }
    );

    $scope.closeAlert = function() {
        $scope.alert = {};
    };

    $scope.cleanFields = function(){
        $scope.product = {};
        $scope.action = 'Agregar';
    }

    $scope.deleteThisProduct = function(id,$index){
        var url = 'http://localhost:8080/api/Product/'+id

        $http.delete(url)
            .then(function success (res){
                console.log(res);
                $scope.alert.type = 'success';
                $scope.alert.message = 'Producto Borrado';
                $scope.products.splice($index,1);
                $window.scrollTo(0, 0);
            },
            function error (res){
                console.log(res);
                $scope.alert.type = 'danger';
                $scope.alert.message = 'Error al borrar el producto';
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

    $scope.updateThisProduct = function(id, $index){
        var url = 'http://localhost:8080/api/Product/'+id;
        $http.get(url)
            .then(function success (res){
                    console.log(res);
                    $scope.action = 'Actualizar';
                    $scope.product = res.data.message;
                    $scope.aux = $index;
                    $window.scrollTo(0, 0);
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
                $scope.alert.type = 'success';
                $scope.alert.message = 'Producto Agregado';
                $scope.products.push(res.data.message);
                $window.scrollTo(0, 0);
            },
            function error (res){
                console.log(res);
                $scope.alert.type = 'danger';
                $scope.alert.message = 'Error al agregar el producto';
            }
        );
        $scope.product = {};
    };

    function updateProduct(url){
        console.log($scope.product);
        $http.put(url, $scope.product)
            .then(function success (res){
                console.log(res);
                $scope.products.splice($scope.aux,1);
                $scope.products.splice($scope.aux,0,res.data.message);
                $scope.action = 'Agregar';
                $scope.alert.type = 'success';
                $scope.alert.message = 'Producto Actualizado';
                $scope.aux = null;
                $window.scrollTo(0, 0);
            },
            function error (res){
                console.log(res);
                $scope.alert.type = 'danger';
                $scope.alert.message = 'Error al actualizar el producto';
            }
        );
        $scope.product = {};
    };

});
