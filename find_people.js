'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'http://directory.osu.edu/fpjson.php';

function FindPeople() {
}

/**
 * Formats a full name plus dot n meant to identify an individual quickly in speach.
 * @param vals full person's json return
 * @returns {*}
 */
FindPeople.formatNameId = function(person) {

  var formatted = _.template('${first} ${middle} ${username}')({
    first: person.first_name,
    middle: person.middle_name,
    username: person.username
  });

  return formatted;

};

/**
 * Formats an address for speach.
 * @param vals address portion of a person's json return
 * @returns {*}
 */
FindPeople.formatAddress = function(address) {

  var formatted = _.template('${room_number} ${street1}')({
    room_number:  FindPeople.formatRoom(address.room_number),
    street1: address.street1
  })
  return formatted;

};

FindPeople.formatRoom = function(room) {
  return !isNaN(parseFloat(room)) && isFinite(room) ? 'room ' + room : room;
}

/**
 * Formats an address for speach.
 * @param vals address portion of a person's json return
 * @returns {*}
 */
FindPeople.formatTitlePrefix = function(appointment) {
  return FindPeople.titlePriority(appointment.job_title) > 0 ? appointment.job_title : '';
};


/**
 * Returns the highest ranking appointment.
 * @param appointments list of appointments
 * @returns {*}
 */
FindPeople.bestAppointment = function(appointments) {

  var best = null;
  var best_priority = 0;
  var curr_priority = 0;

  for (var i=0; i<appointments.length; i++) {
    curr_priority = FindPeople.titlePriority(appointments[i].job_title);
    if ((best == null) || (curr_priority > best_priority)) {
      best = appointments[i];
      best_priority = FindPeople.titlePriority(best.job_title);
    }
  }
  return best;
};

FindPeople.titlePriority = function(title){

  var map = {
    'President': 9999,
    'Vice President': 9500,
    'Dean': 8999,
    'Associate Dean': 8500,
    'Director': 4999,
    'Associate Director': 4500,
    'Professor': 2999
  }
  return map.hasOwnProperty(title) ? map[title] : 0;

};


/**
 * Requests info by first and last names.
 * @param last_name
 * @param first_name
 * @returns {*}
 */
FindPeople.prototype.fromName = function (last_name, first_name) {
  return this.getFromName(last_name, first_name).then(
    function (response) {
      console.log('success - received info for ' + last_name + ', ' + first_name);
      console.log(response.body);
      return response.body;
    }
  );
};

FindPeople.prototype.getFromName = function (last_name, first_name) {
  var options = {
    method: 'GET',
    uri: ENDPOINT + '?filterOnlyEmployees=employee&lastname=' + last_name + '&firstname=' + first_name,
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};


/**
 * Requests info by name.n.
 * @param username
 * @returns {*}
 */
FindPeople.prototype.fromUsername = function (username) {
  return this.getFromUsername(username).then(
    function (response) {
      console.log('success - received info for ' + username);
      return response.body;
    }
  );
};

FindPeople.prototype.getFromUsername = function (username) {
  var options = {
    method: 'GET',
    uri: ENDPOINT + '?filterOnlyEmployees=employee&name_n=' + username,
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};
module.exports = FindPeople;