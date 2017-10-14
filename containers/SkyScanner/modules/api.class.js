var assert = require('assert');
const env = require('node-env-file')('./.env')
var request = require('sync-request');
var moment = require('moment');
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
    getDestinations: function(params) {
        var origin_id = api.getOriginId(params.origin);
        if(!origin_id) {
            return {
                error: true,
                msg: 'invalid origin'
            }
        }
        if(!moment(params.depDate).isValid()) {
            return {
                error: true,
                msg: 'invalid departure date'
            }
        }
        if(!moment(params.arrDate).isValid()) {
            return {
                error: true,
                msg: 'invalid return date'
            }
        }
    }
}

module.exports = api;
