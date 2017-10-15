var app = angular.module('betaway');

app.factory('betFlight', function($http){

    return {

        endpoint: "/betflight",

        getData: function(data){
            $http.post(this.endpoint, data)
                .then(function(response){

                }, function(error){

                });
        }
    }

});