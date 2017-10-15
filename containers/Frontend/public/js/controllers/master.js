var app = angular.module('betaway', []);
var endpoint = ""

app.controller('master', ['$scope', '$http', 'betFlight', 
    function($scope, $http, betFlight){

    $scope.dest = "";
    $scope.price = "£0.00";
    $scope.date = "";
    $scope.processing = false;
    $scope.modalOn = false;

    $scope.confirmGet = function(){
        $scope.modalOn = true;
    };

    $scope.getData = function(){
        betFlight.getData({
            dest: $scope.dest,
            price: $scope.price,
            inboundDate: $scope.date,
            outbountDate: getOutbound()
        });
    }

    $scope.cancel = function(){
        $scope.modalOn = false;
    }

    function getOutbound(){
        var out = new Date();
        var window;
        out.setDate(out.getDate() + window);
    }

}]);