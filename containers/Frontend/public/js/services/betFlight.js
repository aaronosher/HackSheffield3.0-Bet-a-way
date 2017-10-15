var app = angular.module('betaway');

app.factory('betFlight', function($http, $q){

    return {

        getData: function(endpoint, data){
            
            var def = $q.defer();
            console.log(data);
            $http.post(endpoint, data)
                .then(function(response){
                    def.resolve(response);
                }, function(error){
                    def.reject(error);
                });

            return def.promise;

        }
    }

});