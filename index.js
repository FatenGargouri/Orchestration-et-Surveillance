// index.js
const express = require('express');
const { increaseCustomMetric, exposeMetrics } = require('./metrics');
const app = express();

const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0';

// Your existing routes

app.get('/', function (req, res) {
  res.send('{ "response": "Hello From Faten" }');
  // Increase the custom metric for the '/' endpoint
  increaseCustomMetric('/');
});

app.get('/will', function (req, res) {
  res.send('{ "response": "Hello World" }');
  // Increase the custom metric for the '/will' endpoint
  increaseCustomMetric('/will');
});

app.get('/ready', function (req, res) {
  res.send('{ "response": "Great!, It works!" }');
  // Increase the custom metric for the '/ready' endpoint
  increaseCustomMetric('/ready');
});

// Expose metrics endpoint
exposeMetrics(app);

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}/`);
});

module.exports = app;

