'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'http://directory.osu.edu/fpjson.php';

function FindPeople() {
}

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