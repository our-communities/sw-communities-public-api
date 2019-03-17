'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

router.get('/another', (req, res) => res.json({ route: req.originalUrl }));

router.get('/api-v1', (req, res) => {

  fetch('https://southwestcommunities.co.uk/api/v1/data.json')
  .then(res.json({ data : req.body }));

  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write('<h1>Hello from Express.js API!</h1>');
  // ;
});

router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
