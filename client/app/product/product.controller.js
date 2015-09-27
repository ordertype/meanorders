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

      $scope.product = '';

      $http.get('/api/products/' + $stateParams.id).success(function(product) {
          $scope.product = product;
      });
   
  })
  .controller('ProductEditCtrl',function ($scope, $state, $http,  $location, $stateParams, Auth, User) {  

   $scope.product = '';

   $scope.updateProduct = function(){
        
        $http.put('/api/products/' + $stateParams.id, $scope.product).success(function(product, $state) {
            $location.path('/product');
        }
    )};

    $scope.loadProduct = function(){
          $http.get('/api/products/' + $stateParams.id).success(function(product) {
          $scope.product = product;
      });
    };

    $scope.loadProduct();

    
  });
