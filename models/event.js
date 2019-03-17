class Evnt {
  constructor(){

  }

  allEventsByOrganiser(allEvents, orgID) {
    console.log('all events from org');
    // filter out the events for requested org
    let theseEvents = [];
    allEvents.forEach(evt => {
      if (evt.organiserid === orgID){
        console.log('org match');
        theseEvents.push(evt);
      }
    });

    // return them
    return theseEvents;
  }

  nextEventByOrganiser(allEvents, orgID) {
    // filter out all events for requested org


    // sort event by date


    // pull out the most recent


    // return them
  }

  eventByID(allEvents, eventID) {
    // find the event with the right ID
    let thisEvent = {};
    allEvents.forEach(evt => {
      if (evt.id === eventID){
        thisEvent = evt;
      }
    });

    // return
    return thisEvent;
  }
}

module.exports = new Evnt();
