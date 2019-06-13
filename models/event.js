'use strict';

const dateHelper = require('../helpers/dateHelpers.js');

class Evnt {
  constructor(){ }

  allEventsByOrganiser(allEvents, orgID) {
    console.log('all events from org');
    // filter out the events for requested org
    let theseEvents = [];
    allEvents.forEach(evt => {
      if (parseInt(evt.organiserid) === parseInt(orgID)){
        console.log('org match');
        theseEvents.push(evt);
      }
    });

    // return them
    return theseEvents;
  }

  nextEventByOrganiser(allEvents, orgID) {
    console.log('next event by organiser');
    // filter out all events for requested org
    let orgEvents = this.allEventsByOrganiser(allEvents, orgID);

    // sort event by date
    orgEvents.sort(dateHelper.sortByDate);

    // return it
    return orgEvents[0];
  }

  eventByID(allEvents, eventID) {
    console.log('event by id');
    // find the event with the right ID
    let thisEvent = {};
    allEvents.forEach(evt => {
      if (parseInt(evt.id) === parseInt(eventID)){
        thisEvent = evt;
      }
    });
    return thisEvent;
  }

  nextEvent(allEvents){
    console.log('all events');
    return allEvents.sort(dateHelper.sortByDate)[0];
  }

  aroundDate(allEvents, date) {

    date = new Date(date);
    console.log('Around date: ' + date);
    let result = { 'matches': [], 'near': [] };

    // check for event on that day.
    allEvents.forEach(evt => {
      let evtStart = new Date(evt.start);
      const startDate = new Date(date);
      const endDate = new Date(date);
      startDate.setDate(date.getDate() - 5);
      endDate.setDate(date.getDate() + 5);
      console.log(evtStart);
      console.log(startDate);
      console.log(endDate);
      console.log(evtStart >= startDate && evtStart <= endDate);
      console.log('---------------------');

      if (evtStart.getMonth() === date.getMonth() && evtStart.getDate() === date.getDate()) {
        result.matches.push(evt);
      } else if (evtStart >= startDate && evtStart <= endDate) {
        result.near.push(evt);
      }
    });

    return result;
  }
}

module.exports = new Evnt();
