class Evnt {
  constructor(){

  }

  allEventsByOrganiser(allEvents, orgID) {
    // get all events


    // filter out the events for requested org


    // return them
  }

  nextEventByOrganiser(allEvents, orgID) {
    // filter out the next event for requested org


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
