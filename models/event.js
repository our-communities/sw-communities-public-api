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

    // return
    return thisEvent;
  }
}

module.exports = new Evnt();
