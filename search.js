'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var BUILDING_ENDPOINT = 'https://kmdata.osu.edu/api/buildings.json';
var FPJSON_ENDPOINT = 'http://directory.osu.edu/fpjson.php';
var Building = require('./model/building');
var Person = require('./model/person');

function Search() {
}

Search.prototype.buildingFromCode = function (code) {
  return this.getBuildingFromCode(code).then(
    function (response) {
      console.log('success - received info for ' + code);
      return new Building(response.body[0]);
    }
  );

};

Search.prototype.getBuildingFromCode = function (code) {
  var options = {
    method: 'GET',
    uri: BUILDING_ENDPOINT + '?building_code=' + code + '&include=location',
    resolveWithFullResponse: true,
    json: true,
    timeout: 5000
  };
  return rp(options);
};

Search.prototype.personFromName = function (last_name, first_name) {
  return this.getPersonFromName(last_name, first_name).then(
    function (response) {
      console.log('success - received info for ' + last_name + ', ' + first_name);
      return new Person(response.body[0]);
    }
  );
};

Search.prototype.getPersonFromName = function (last_name, first_name) {
  var options = {
    method: 'GET',
    uri: FPJSON_ENDPOINT + '?filterOnlyEmployees=employee&lastname=' + last_name + '&firstname=' + first_name,
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
Search.prototype.personFromUsername = function (username) {
  return this.getPersonFromUsername(username).then(
    function (response) {
      console.log('success - received info for ' + username);
      return new Person(response.body[0]);
    }
  );
};

Search.prototype.getPersonFromUsername = function (username) {
  var options = {
    method: 'GET',
    uri: FPJSON_ENDPOINT + '?filterOnlyEmployees=employee&name_n=' + username,
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};
module.exports = Search;

