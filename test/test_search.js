'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var Search = require('../search');
chai.config.includeStack = true;

describe('Search', function () {
  var search = new Search();

  var building = {
    "basement_ind": 1,
    "building_code": "274",
    "building_owner_id": 1,
    "building_status_id": 2,
    "campus_id": 1,
    "construction_year": 1967,
    "created_at": "2013-12-16T16:18:51Z",
    "elevator_ind": 0,
    "gross_area_sqft": "118821.0",
    "gross_area_sqm": "11038.827363",
    "id": 273,
    "institutional_type": "Academic",
    "location_id": 28715,
    "name": "Hitchcock Hall",
    "name_abbrev": "HI",
    "name_abbrev_long": "HITCHCOCK",
    "name_formal": "Hitchcock Hall, Embury A.",
    "number_of_floors": 5,
    "photo_url": "http://www.osu.edu/map/buildingImg.php?id=274",
    "resource_id": 8038935,
    "updated_at": "2014-02-25T10:49:02Z",
    "location": {
      "abbreviation": "HITCHCOCK",
      "address": "2070 Neil Ave",
      "address2": null,
      "city": "Columbus",
      "created_at": "2014-02-25T10:49:02Z",
      "geotype_id": null, "id": 28715,
      "latitude": "-83.015281",
      "location_type_id": 13,
      "longitude": "40.00358",
      "name": "Hitchcock Hall",
      "state": "OH",
      "updated_at": "2014-02-25T10:49:02Z",
      "zip": "43210-1226"
    }
  };

  describe('#buildingFromCode', function () {
    context('with code 274', function () {
      it('returns hitchcock hall', function () {
        var building_name = search.buildingFromCode('274').then(function (building){
          return building.getJson.name;
        });
        expect(building_name).to.eventually.eq('Hitchcock Hall');
      });
    });
  });

  describe('#personFromName', function () {
    context('with a first and last name', function () {
      it('returns a match', function () {

        var last_name = 'Drake';
        var first_name = 'Michael';
        var value = search.personFromName(last_name, first_name).then(function (obj) {
          return obj[0].last_name;
        });
        return expect(value).to.eventually.eq(last_name);
      });
    });
  });

});