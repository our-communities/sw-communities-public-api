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
    // filter out all events for requested org
    let orgEvents = this.allEventsByOrganiser(allEvents, orgID);

    // sort event by date
    orgEvents.sort(dateHelper.sortByDate);

    // return it
    return orgEvents[0];
  }

  eventByID(allEvents, eventID) {
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
    return allEvents.sort(dateHelper.sortByDate)[0];
  }

  aroundDate(allEvents, date) {
    console.log('Around date: ', date);
    let result = { 'matches': [], 'near': [] };

    // check for event on that day.
    allEvents.forEach(evt => {
      let evtStart = new Date(evt.startDate);
      const startDate = date;
      const endDate = date;
      startDate.setDate(date.getDate() - 5);
      endDate.setDate(date.getDate() + 5);

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
