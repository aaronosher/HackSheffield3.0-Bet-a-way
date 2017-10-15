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
        console.log(carriers);
        let objectToReturn = []
        routes.forEach(function(route) {
            route.QuoteIds.forEach(function(quote) {
                let fullQuote = quotes.filter(a => a.QuoteId == quote)[0]
                outboundDepartureCity = places.filter(a => a.PlaceId == fullQuote.OutboundLeg.OriginId)
                outboundArrivalCity = places.filter(a => a.PlaceId == fullQuote.OutboundLeg.DestinationId)
                inboundDepartureCity = places.filter(a => a.PlaceId == fullQuote.InboundLeg.OriginId)
                inboundArrivalCity = places.filter(a => a.PlaceId == fullQuote.InboundLeg.DestinationId)
                objectToReturn.push({
                    quoteId: quote,
                    departureCity: outboundDepartureCity[0].CityName,
                    arrivalCity: outboundArrivalCity[0].CityName,
                    direct: fullQuote.Direct,
                    outbound: {
                        origin: outboundDepartureCity,
                        destination: outboundArrivalCity,
                        carrier: carriers.filter(a => a.CarrierId == fullQuote.OutboundLeg.CarrierIds[0]).Name,
                        datetime: fullQuote.OutboundLeg.DepartureDate,
                    },
                    inbound: {
                        origin: inboundDepartureCity,
                        destination: inboundArrivalCity,
                        carrier: carriers.filter(a => a.CarrierId == fullQuote.InboundLeg.CarrierIds[0]).Name,
                        datetime: fullQuote.InboundLeg.DepartureDate,
                    },
                    price: fullQuote.MinPrice,
                })
            })
            // console.log('Flight '+route.QuoteIds[0]+': '+departureCity[0].CityName+' to '+arrivalCity[0].Name+' for £'+route.Price+'.')
        })
        return objectToReturn
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
        let routes = api.fetchRoutes(params, origin_id);
        let returnData = api.getRoutesInPriceRange(params.maxPrice, routes)
        return {
            error: false,
            msg: returnData
        }
    }
}

module.exports = api;
