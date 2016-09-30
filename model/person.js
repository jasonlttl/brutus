
var _ = require('lodash');
var method = Person.prototype;

function Person(json) {
  this.json = json;
}

method.getJson = function() {
  return this.json;
};

method.firstName = function() {
  return this.json.first_name;
}

method.middleName = function() {
  return this.json.middle_name;
}

method.lastName = function() {
  return this.json.last_name;
}

method.username = function() {
  return this.json.username;
}

/**
 * Formats a full name plus dot n meant to identify an individual quickly in speach.
 * @param vals full person's json return
 * @returns {*}
 */
method.nameId = function() {

  var formatted = _.template('${first} ${middle} ${username}')({
    first: this.firstName(),
    middle: this.middleName(),
    username: this.username()
  });

  return formatted;

};

/**
 * Formats an address for speach.
 * @param vals address portion of a person's json return
 * @returns {*}
 */
method.address = function() {

  var formatted = _.template('${building_room} at ${street1}')({
    building_room:  this.room(),
    street1: this.json.address.street1
  })
  return formatted;

};

method.room = function() {
  var room = this.json.address.room_number;
  var building = this.json.address.building.name;
  return !isNaN(parseFloat(room)) && isFinite(room) ? 'room ' + room + ' ' + building : room;
}

/**
 * Formats an address for speach.
 * @param vals address portion of a person's json return
 * @returns {*}
 */
method.titlePrefix = function() {
  var appointment = this.bestAppointment();
  return this.titlePriority(appointment.job_title) > 0 ? appointment.job_title : '';
};


/**
 * Returns the highest ranking appointment.
 * @param appointments list of appointments
 * @returns {*}
 */
method.bestAppointment = function() {

  var best = null;
  var best_priority = 0;
  var curr_priority = 0;

  for (var i=0; i<this.json.appointments.length; i++) {
    curr_priority = this.titlePriority(this.json.appointments[i].job_title);
    if ((best == null) || (curr_priority > best_priority)) {
      best = this.json.appointments[i];
      best_priority = this.titlePriority(best.job_title);
    }
  }
  return best;
};

method.titlePriority = function(title){

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

module.exports = Person;