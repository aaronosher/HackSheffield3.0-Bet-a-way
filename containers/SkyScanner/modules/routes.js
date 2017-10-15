const express = require('express');
const api = require('./api.class.js');

const app = express();
app.get('/', (req, res) => {
  res.send('Bet-a-way API');
});

app.get('/destinations/:maxPrice/:origin/:depDate/:arrDate', function (req, res) {
  res.send(api.getDestinations(req.params));
})

module.exports = app;
