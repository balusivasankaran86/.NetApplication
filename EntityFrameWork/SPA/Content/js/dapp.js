var kfg = angular.module('KFG', []); //'angularValidator'

kfg.controller('RequestController', ['$scope', function ($scope) {
    $scope.greeting = 'Welcome!';

} ]);


kfg.directive('facRequest', function () {
  return {
    restrict: 'E',
    templateUrl: '/directive/fac-request.htm'
}; 

});


