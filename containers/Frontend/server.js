const express = require('express');
var path = require('path');
var request = require('request');

const skyBets = "http://skybets/bets";
const skyScanner = "http://skyscanner";
const PORT = 8080;
const HOST = "localhost";
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
var path = require('path');
var index = "/public/index.html";

function getSkyscannerData(req, res, next){
    
}

const getGamesData = (req, res, next) => {
    request(skyBets, (error, response, body) => {
        res.data = body;
        next();
    });
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + index));
});

app.post('/betflight', getGamesData, (req, res) => {
    res.send(res.data);
});

app.listen(PORT, HOST, () => {
    console.log("Server started on " + HOST 
    + ", listening on port " + PORT);
});