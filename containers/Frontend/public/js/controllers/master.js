var app = angular.module('betaway', []);
var endpoint = ""

app.controller('master', ['$scope', '$http', function($scope, $http){

    $scope.dest = "";
    $scope.price = "£0.00";
    $scope.processing = false;

}]);