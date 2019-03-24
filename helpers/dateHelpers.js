'use strict';

let dateHelpers = {};

/**
* Sorts an array by date, with the oldest first. Use with Array.sort()
* @param {Event} a Event 1 to compare
* @param {Event} a Event 2 to compare
* @return {Integer} The order of items
*/
dateHelpers.sortByDate = (a, b) => {
  return new Date(a.start) - new Date(b.start);
};

exports.date = dateHelpers;
