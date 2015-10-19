'use strict';

angular.module('meanordersApp')
  .controller('ProductCtrl', function ($scope, $http, Auth, User, $location, socket) {

  	$scope.awesomeProducts = [];
    
    $scope.productsGrid = {
      enableFiltering: true,
      enableSorting: true,
      infiniteScrollRowsFromEnd: 40,
      infiniteScrollUp: true,
      infiniteScrollDown: true,
      rowHeight: 40,
      columnDefs: [
        { name: 'Product',field: 'name' },
        { name: 'Description',field: 'info' }, 
        { name: 'Actions',
            cellClass: 'ui-grid-vcenter',
            enableColumnMenu: false,
            enableFiltering: false,
            enableSorting: false,
            cellTemplate:'<button class="btn btn-primary" ng-click="grid.appScope.viewProduct(row.entity)">View</button> <button class="btn btn-danger" ng-click="grid.appScope.deleteProduct(row)">Delete</button>' }
      ],
      onRegisterApi: function( gridApi ) {
        $scope.grid1Api = gridApi;
      }
    };    

    $http.get('/api/products').success(function(awesomeProducts) {
      $scope.awesomeProducts = awesomeProducts;
      $scope.productsGrid.data = awesomeProducts;
    });

    $scope.deleteProduct = function(product) {
       var index = $scope.productsGrid.data.indexOf(product.entity);            
       $http.delete('/api/products/' + product.entity._id).success(function(product, $state) {
         $scope.productsGrid.data.splice(index, 1);
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
