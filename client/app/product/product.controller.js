'use strict';

angular.module('meanordersApp')
  .controller('ProductCtrl', function ($scope, $http, Auth, User, $location, socket) {

  	$scope.awesomeProducts = [];

    $http.get('/api/products').success(function(awesomeProducts) {
      $scope.awesomeProducts = awesomeProducts;
      
    });

    $scope.deleteProduct = function(product, index) {
      $http.delete('/api/products/' + product._id).success(function(product, $state) {
        $scope.awesomeProducts.splice(index,1);
        }
     )};
       
    $scope.viewProduct = function(product) {
       $location.path('/product/'+product._id+'/view');
    };

   
  })
  .controller('ProductViewCtrl',function ($scope,$location,  $http, $stateParams, Auth, User) {  

      $scope.product = '';

      $http.get('/api/products/' + $stateParams.id).success(function(product) {
          $scope.product = product;
      });
  
      $scope.cancel = function() {
       $location.path('/product');
    };    
     
  }).controller('ProductCreateController',function($scope,$state,$http,$stateParams, $location){

    $scope.product= {};

    $scope.addProduct = function(){
        
        $http.post('/api/products', $scope.product).success(function(product, $state) {
            $location.path('/product');
        }
    )};
    
    $scope.cancel = function() {
      $location.path('/product');
    }

  }).controller('ProductEditCtrl',function ($scope, $state, $http,  $location, $stateParams, Auth, User) {  

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
    
    $scope.cancel = function() {
        $http.get('/api/products/' + $stateParams.id).success(function(product) {
           $location.path('/product/'+product._id+'/view');
      });
    };

    
  });
