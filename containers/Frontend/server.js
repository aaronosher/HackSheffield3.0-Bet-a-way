const express = require('express');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');

const skyBets = "http://localhost:5000/bet";
const skyScanner = "http://localhost:7000/destinations";
const PORT = 8080;
const HOST = "localhost";
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
var path = require('path');
var index = "/public/index.html";



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + index));
});

app.post('/betflight', (req, res) => {

    var price = parseInt(req.body.price);
    var inbound = req.body.inboundDate;
    var outbound = req.body.outboundDate;
    var origin = req.body.origin;

    if(!isNaN(price)
        || !inbound
        || !outbound
        || origin.length === 0){
            res.send({error: "Invalid data provided"});
            return;
        }

    request.get(skyBets, (error, response, bets) => {
        
        bets = JSON.parse(bets);
        var lowestOdd = parseFloat(bets[0].number);
        var highestOdd = parseFloat(bets[1].number);

        var safeBudget = price - (price / lowestOdd);
        var dangerBudget = price - (price / highestOdd);

        var query = skyScanner  
        + "/" + safeBudget 
        + "/" + origin 
        + "/" + outbound
        + "/" + inbound;
        console.log(query);

        request.get(skyScanner  
            + "/" + safeBudget 
            + "/" + origin 
            + "/" + outbound
            + "/" + inbound, (error2, response2, safeBudgetFlight) => {
            request.get(skyScanner
            + "/" + dangerBudget 
            + "/" + origin 
            + "/" + outbound 
            + "/" + inbound, (error3, response3, dangerBudgetFlight) => {
                if(JSON.parse(safeBudgetFlight).msg.length === 0 
                || JSON.parse(dangerBudgetFlight).msg.length === 0){
                    var data = {error: 'Sorry no flights available for the price and dates specified'};
                    res.send(data);
                }else{
                    var data = {bets: bets,
                        price: price,
                        dangerFlight: JSON.parse(dangerBudgetFlight),
                        safeFlight: JSON.parse(safeBudgetFlight)};
                    console.log(data);
                    res.send(data);
                }
            })
        });
    });
});

app.listen(PORT, HOST, () => {
    console.log("Server started on " + HOST 
    + ", listening on port " + PORT);
});