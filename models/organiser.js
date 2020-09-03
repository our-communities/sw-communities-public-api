'use strict';

class Organiser {
  constructor(){ }

  getOrganiser(data, id) {
    data.forEach(org => {
        if (parseInt(org.id === parseInt(id))){
            return org;
        }
    });
  }

}

module.exports = new Organiser();
