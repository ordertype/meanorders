'use strict';

angular.module('meanordersApp')
  .controller('ProductCtrl', function ($scope, $http, Auth, User) {

  	$scope.awesomeProducts = [];

    $http.get('/api/products').success(function(awesomeProducts) {
      $scope.awesomeProducts = awesomeProducts;
      //socket.syncUpdates('product', $scope.awesomeProducts);
    });

   
    $scope.addProduct = function() {
      if($scope.newProduct === '') {
        return;
      }
      $http.post('/api/products', { name: $scope.newProduct });
      $scope.newProduct = '';
    };

    $scope.deleteProduct = function(product) {
      $http.delete('/api/products/' + product._id);
    };

    
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('product');
    });
  })
  .controller('ProductViewCtrl',function ($scope, $http, $stateParams, Auth, User) {  

      $scope.product=$http.get('/api/products/' + product._id );
      window.alert("test");

    
  })
  .controller('ProductEditCtrl',function ($scope, $http, $stateParams, Auth, User) {  

   $scope.updateProduct=function(){
        $scope.product.$update(function(){
            $state.go('products');
        });
    };

    $scope.loadProduct=function(){
        $scope.product=$http.get('/api/products/' + {id:$stateParams.id} );
        /*Movie.get({id:$stateParams.id});*/
    };

    $scope.loadProduct();

    
  })
  ;
