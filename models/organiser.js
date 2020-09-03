'use strict';

class Organiser {
  constructor(){ }

  getOrganiser(data, id) {
    for(let org of data) {
      if (parseInt(org.id) === parseInt(id)){
        return org;
      }
    }
  }
}

module.exports = new Organiser();
