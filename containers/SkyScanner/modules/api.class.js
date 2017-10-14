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
    fetchRoutes: function(params, originId) {
        var res =  request(
            'GET',
            env.baseUrl+
            'browseroutes/v1.0/'+
            env.country+
            '/'+
            env.currency+
            '/'+
            env.locale+
            '/'+
            originId+
            '/anywhere/'+
            params.depDate+
            '/'+
            params.arrDate+
            '?apiKey='+
            env.apiKey);
        var routes = JSON.parse(res.getBody('utf8'))
        return routes;
    },
    getRoutesInPriceRange: function(price, routes) {
        var quotes = routes.Quotes
        var r_routes = routes.Routes
        var places = routes.Places
        var carriers = routes.Carriers
        var validQuotes = []
        validQuotes = quotes.filter(a => a.MinPrice > price).map(a => a.QuoteId)
        routes = r_routes
            .filter(a => a.QuoteIds !== undefined)
            .filter(a => a.QuoteIds
            .map(b => validQuotes.indexOf(b) === -1)
            .reduce((c,d) => c || d), false)
        console.log(validQuotes)
        console.log(r_routes)
        return routes
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
        routes = api.fetchRoutes(params, origin_id);
        return api.getRoutesInPriceRange(params.maxPrice, routes)
    }
}

module.exports = api;
