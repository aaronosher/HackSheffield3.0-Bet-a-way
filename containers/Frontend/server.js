const express = require('express');
var path = require('path');
var request = require('request');

const skyBets = "http://skybets";
const skyScanner = "http://skyscanner";
const PORT = 8080;
const HOST = "localhost";
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
var path = require('path');
var index = "/public/index.html";

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + index));
});

app.get('/betflight', (req, res) => {
    
});

app.listen(PORT, HOST, () => {
    console.log("Server started on " + HOST 
    + ", listening on port " + PORT);
});