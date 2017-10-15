var app = angular.module('betaway', []);
var endpoint = "/betflight";

app.controller('master', ['$scope', '$http', 'betFlight', 
    function($scope, $http, betFlight){

    $scope.form = {};
    $scope.form.dest = "";
    $scope.form.price = "£0.00";
    $scope.form.date = "";
    $scope.processing = false;
    $scope.modalOn = false;
    $scope.majorError = "";
    $scope.betsMenu = false;
    var path = "safe";
    $scope.resultsPage = false;
    $scope.flights = [];
    $scope.odds = 0;

    $scope.confirmGet = function(){
        $scope.modalOn = true;
    };

    $scope.goToBetsMenu = function(){
        $scope.cancel();
        $scope.betsMenu = true;
    }

    $scope.risk = function(){
        path = 'risk';
        $scope.getData();
    }

    $scope.safe = function(){
        path = 'safe';
        $scope.getData();
    }

    $scope.getData = function(){
        $scope.betsMenu = false;
        $scope.cancel();
        $scope.majorError = "";
        $scope.processing = true;
        betFlight.getData(endpoint, {
            origin: $scope.form.dest,
            price: parseInt($scope.form.price.replace(/[£,]/g,"")),
            outboundDate: toISO($scope.form.date),
            inboundDate: getOutbound(),
            route: path
        }).then(function(response){
            $scope.processing = false;
            if(response.data.error){
                $scope.majorError = response.data.error;
            }else{
                console.log(response.data);
                $scope.flights = response.data.flight.msg;
                $scope.odds = response.data.odds;
                $scope.resultsPage = true;
            }
        }, function(error){
            $scope.processing = false;
            $scope.majorError = "An unknown error has occured";
            $scope.modalOn = true;
        });
    }

    $scope.cancel = function(){
        $scope.modalOn = false;
        $scope.majorError = "";
        $scope.resultsPage = false;
    }

    function addDays(date, amount) {
        var tzOff = date.getTimezoneOffset() * 60 * 1000,
            t = date.getTime(),
            d = new Date(),
            tzOff2;
      
        t += (1000 * 60 * 60 * 24) * amount;
        d.setTime(t);
      
        tzOff2 = d.getTimezoneOffset() * 60 * 1000;
        if (tzOff != tzOff2) {
          var diff = tzOff2 - tzOff;
          t += diff;
          d.setTime(t);
        }
      
        return d;
      }
    
    function paddedZeroes(value){
        return (value < 10) ? "0" + value.toString() : value;
    }

    function toISO(date){
        if(typeof(date) !== Date){
            date = new Date(date);
        }
        return date.getFullYear() + "-" + paddedZeroes(date.getMonth() + 1) + "-" + paddedZeroes(date.getDate());
    }

    function getOutbound(){
        var arr = $scope.form.date.split("/");
        arr = [arr[2], arr[0], arr[1]];
        var resultDateString = arr.join("-");
        var out = new Date(resultDateString);
        var date = addDays(out, 2);
        return toISO(date);
    }

}]);