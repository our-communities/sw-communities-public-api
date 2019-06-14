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
//
router.get('/api/v1', (req, res) => {
  console.log('API v1 route hit');

  try {
  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
   .then(res => {
     let results = res.json();
     return results;
   })
   .then(data => {
     console.log(data);
     res.json({ data : data });
   })
   .catch(err => {
      console.log(err);
      console.log('first catch');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(err);
      res.end();
   });
 }catch (err){
   console.log(err);
   console.log('Try / Catch');
   res.writeHead(200, { 'Content-Type': 'text/html' });
   res.write(err);
   res.end();
 }
});

router.get('/api/v1/nextEvent', (req, res) => {
  console.log('Next event');
  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(data => {
    let thisEvent = Events.nextEvent(data);
    res.json({ event : thisEvent });
  }).catch(err => {
    console.log(err);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(err);
    res.end();
  });
});

router.get('/api/v1/aroundDate/:date', (req, res) => {
  console.log('REQUESTED DATE: ', req.params.date);
  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(data => {
    let results = Events.aroundDate(data, req.params.date);
    res.json({ event : results });
  }).catch(err => {
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

router.get('/api/v1/nextEventByOrganiser/:id', (req, res) => {
  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(data => {
    let theseEvents = Events.nextEventByOrganiser(data, req.params.id);
    res.json({ event : theseEvents });
  }).catch(err => {
    console.log(err);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(err);
    res.end();
  });
});

router.get('/api/v1/eventByOrganiserAndDate/:id/:date', (req, res) => {
  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(data => {
    let thisEvent = Events.eventByOrganiseAndDate(data, req.params.id, req.params.date);
  // app.use('/', router);
  // app.use('/', router);
    res.json({ event : thisEvent });
  }).catch(err => {
    console.log(err);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(err);
    res.end();
  });
});

app.use(bodyParser.json());

// Make app work locally and remotely
// if (process.env.CONTEXT){
  app.use('/.netlify/functions/server', router); // path must route to lambda
// } else {
// }


module.exports = app;
module.exports.handler = serverless(app);
