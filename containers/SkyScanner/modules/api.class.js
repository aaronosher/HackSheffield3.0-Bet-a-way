var assert = require('assert');
const env = require('node-env-file')('./.env')
var request = require('sync-request');
// SkyScanner API handler
var api = {
    getOriginId: function(origin_query) {
        var res =  request(
            'GET',
            env.baseUrl+
            'autosuggest/v1.0/'+
            env.country+
            '/'+
            env.currency+
            '/'+
            env.locale+
            '?query='+
            origin_query+
            '&apiKey='
            +env.apiKey);
        var locationId = JSON.parse(res.getBody('utf8'))
        if(locationId.Places[0] === undefined) {
            return false;
        } else {
            return locationId.Places[0].PlaceId;
        }
    },
    validate_date: function(date) {
        
    },
    getDestinations: function(params) {
        var origin_id = api.getOriginId(params.origin);
        if(!origin_id) {
            return {
                error: true,
                msg: 'invalid origin'
            }
        }
        return origin_id;
    }
}

module.exports = api;
