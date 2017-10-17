const express = require('express');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var moment = require('moment');
const ENV = require('node-env-file')('.env');

const skyBets = ENV.skybet;
const skyScanner = ENV.skyscanner;
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
var path = require('path');
var index = "/public/index.html";

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

Number.prototype.formatMoney = function(c, d, t){
    var n = this, 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
       return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
     };

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + index));
});

app.post('/betflight', (req, res) => {

    var price = parseInt(req.body.price);
    var inbound = req.body.inboundDate;
    var outbound = req.body.outboundDate;
    var origin = req.body.origin;
    var route = req.body.route;

    // if(!isNaN(price)){
    //         res.send({error: "Invalid data provided"});
    //         return;
    //     }

    request.get(skyBets, (error, response, bets) => {
        
        bets = JSON.parse(bets);
        var lowestOdd = parseFloat(bets[0].number);
        var highestOdd = parseFloat(bets[1].number);

        var safeBudget = (price - (price / lowestOdd)).formatMoney();
        var dangerBudget = (price - (price / highestOdd)).formatMoney();

        var query = skyScanner  
        + "/" + safeBudget 
        + "/" + origin 
        + "/" + outbound
        + "/" + inbound;
        console.log(query);
        if(route == "safe"){
            request.get(skyScanner  
                + "/" + safeBudget 
                + "/" + origin 
                + "/" + outbound
                + "/" + inbound, (error2, response2, safeBudgetFlight) => {
                    if(JSON.parse(safeBudgetFlight).msg.length === 0){
                        var data = {error: 'Sorry no flights available for the price and dates specified'};
                        res.send(data);
                    }else{
                        var data = {odds: lowestOdd,
                            budget: safeBudget,
                            flight: JSON.parse(safeBudgetFlight)};
                        res.send(data);
                    }
            });
        }
        else
        {
            request.get(skyScanner
            + "/" + dangerBudget 
            + "/" + origin 
            + "/" + outbound 
            + "/" + inbound, (error3, response3, dangerBudgetFlight) => {
                if(JSON.parse(dangerBudgetFlight).msg.length === 0){
                    var data = {error: 'Sorry no flights available for the price and dates specified'};
                    res.send(data);
                }else{
                    var data = {odds: highestOdd,
                        budget: dangerBudget,
                        flight: JSON.parse(dangerBudgetFlight)};
                    res.send(data);
                }
            });
        }
    });
});

app.listen(ENV.PORT, ENV.HOST, () => {
    console.log("Server started on " + ENV.HOST 
    + ", listening on port " + ENV.PORT);
});