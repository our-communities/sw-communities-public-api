'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const router = express.Router();
const Events = require('../models/event');

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

router.get('/another', (req, res) => res.json({ route: req.originalUrl }));

router.get('/api/v1', (req, res) => {
  console.log('API v1 route hit');

  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
   .then(res => res.json())
   .then(data => {
     console.log(data);
     res.json({ data : data });
   })
   .catch(err => {
      console.log(err);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(err);
      res.end();
   });
});

router.get('/api/v1/eventByID/:id', (req, res) => {
  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(data => {
    let thisEvent = Events.eventByID(data, req.params.id);
    res.json({ event : thisEvent });
  }).catch(err => {
    console.log(err);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(err);
    res.end();
  });
});

router.get('/api/v1/allEventsByOrganiser/:id', (req, res) => {
  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(data => {
    let theseEvents = Events.allEventsByOrganiser(data, req.params.id);
    res.json({ event : theseEvents });
  }).catch(err => {
    console.log(err);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(err);
    res.end();
  });
});

app.use(bodyParser.json());
if (process.env.CONTEXT){
  app.use('/.netlify/functions/server', router); // path must route to lambda
} else {
  app.use('/', router);
}


module.exports = app;
module.exports.handler = serverless(app);

// This file loads!
// fetch('https://southwestcommunities.co.uk/api/v1/data.json', {mode: 'no-cors'})
//  .then((response) => response.json())
//  .then((responseText) => {
//      console.log(responseText);
//  });
