var app = angular.module('betaway', []);
var endpoint = "/betflight";

let skyscannerBookURL = function(outboundIATA, destinationIATA, departureDate, arrivalDate) {
    let baseUrl = "https://www.skyscanner.net/transport/flights/";
    if(!outboundIATA.length() === 3 || !destinationIATA.length() === 3) {
        return false;
    }
    let dDate = moment(departureDate);
    let aDate = moment(arrivalDate);
    departureDate = dDate.format('YYMMDD');
    arrivalDate = aDate.format('YYMMDD');

    let url = baseUrl+outboundIATA+'/'+destinationIATA+'/'+departureDate+'/'+arrivalDate;
}

app.controller('master', ['$scope', '$http', 'betFlight', 
    function($scope, $http, betFlight){

    $scope.form = {};
    $scope.form.dest = "";
    $scope.form.price = "£0.00";
    $scope.form.date = "";
    $scope.processing = false;
    $scope.modalOn = false;
    $scope.majorError = "";

    $scope.confirmGet = function(){
        $scope.modalOn = true;
    };

    $scope.getData = function(){
        $scope.cancel();
        $scope.majorError = "";
        $scope.processing = true;
        console.log($scope.price);
        betFlight.getData(endpoint, {
            origin: $scope.form.dest,
            price: parseInt($scope.form.price.replace(/[£,]/g,"")),
            outboundDate: toISO($scope.form.date),
            inboundDate: getOutbound()
        }).then(function(response){
            $scope.processing = false;
            if(response.error){
                $scope.majorError = response.error;
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