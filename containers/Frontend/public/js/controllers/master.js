var app = angular.module('betaway', []);
var endpoint = ""

app.controller('master', ['$scope', '$http', 'betFlight', 
    function($scope, $http, betFlight){

    $scope.dest = "";
    $scope.price = "£0.00";
    $scope.processing = false;
    $scope.modalOn = false;

    $scope.confirmGet = function(){
        $scope.modalOn = true;
    };

    $scope.getData = function(){
        betFlight.getData($scope.dest);
    }

    $scope.cancel = function(){
        $scope.modalOn = false;
    }

}]);