'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var BUILDING_ENDPOINT = 'https://kmdata.osu.edu/api/buildings.json';
var FPJSON_ENDPOINT = 'http://directory.osu.edu/fpjson.php';
var Building = require('./building');

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
      return response.body;
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

module.exports = Search;

