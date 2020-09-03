'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const router = express.Router();
const Events = require('../models/event');
const Organiser = require('../models/organiser');

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

router.get('/another', (req, res) => res.json({ route: req.originalUrl }));

// Get all data
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
    //  console.log(data);
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

// Get event by id
router.get('/api/v1/event/:id', (req, res) => {
  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(data => {
    let thisEvent = Events.eventByID(data[0].events, req.params.id);
    res.json({ event : thisEvent });
  }).catch(err => {
    console.log(err);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(err);
    res.end();
  });
});

// Get the next event in calendar
router.get('/api/v1/nextEvent', (req, res) => {
  console.log('Next event');
  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(data => {
    let resource = data;
    let thisEvent = Events.nextEvent(resource[0].events);
    res.json({ event : thisEvent });
  }).catch(err => {
    console.log(err);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(err);
    res.end();
  });
});

// Get events between two dates (e.g for a month)
router.get('/api/v1/eventInDatePeriod/:start/:end', (req, res) => {
  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(data => {
    let theseEvents = Events.eventInDatePeriod(data[0].events, req.params.start, req.params.end);
    res.json({ event : theseEvents });
  }).catch(err => {
    console.log(err);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(err);
    res.end();
  });
});

// Get events around a date
router.get('/api/v1/aroundDate/:date', (req, res) => {
  console.log('REQUESTED DATE: ', req.params.date);
  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(data => {
    let results = Events.aroundDate(data[0].events, req.params.date);
    res.json({ event : results });
  }).catch(err => {
    console.log(err);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(err);
    res.end();
  });
});

// Get organiser by id
router.get('/api/v1/organiser/:id', (req, res) => {
  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(data => {
    let thisOrganiser = Organiser.getOrganiser(data[0].organisers, req.params.id);
    res.json({ organiser : thisOrganiser });
  }).catch(err => {
    console.log(err);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(err);
    res.end();
  });
});

// Get the next event by an organiser
router.get('/api/v1/organiser/:id/nextEvent', (req, res) => {
  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(data => {
    let theseEvents = Events.nextEventByOrganiser(data[0].events, req.params.id);
    res.json({ event : theseEvents });
  }).catch(err => {
    console.log(err);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(err);
    res.end();
  });
});

// Get all events by an organiser from ID
router.get('/api/v1/organiser/:id/allEvents', (req, res) => {
  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(data => {
    let theseEvents = Events.allEventsByOrganiser(data[0].events, req.params.id);
    res.json({ event : theseEvents });
  }).catch(err => {
    console.log(err);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(err);
    res.end();
  });
});

// Get event around date by organiser from it's ID
router.get('/api/v1/organiser/:id/EventByDate/:date', (req, res) => {
  fetch('https://southwestcommunities.co.uk/api/v1/data.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(data => {
    let thisEvent = Events.eventByOrganiserAndDate(data[0].events, req.params.id, req.params.date);
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
  // app.use('/', router);
// }


module.exports = app;
module.exports.handler = serverless(app);
