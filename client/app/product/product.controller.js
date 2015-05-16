'use strict';

angular.module('meanordersApp')
  .controller('ProductCtrl', function ($scope, $http, Auth, User) {

  	$scope.awesomeProducts = [];

    $http.get('/api/products').success(function(awesomeProducts) {
      $scope.awesomeProducts = awesomeProducts;
      socket.syncUpdates('product', $scope.awesomeProducts);
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


  });
