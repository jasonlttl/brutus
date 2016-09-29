'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
chai.config.includeStack = true;
var Building = require('../building');

describe('Building', function () {

  var building = new Building({
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
  });

  describe('#streetAddress', function () {
    context('with hitchcock', function () {
      it('returns 2070 Neil', function () {
        expect(building.streetAddress()).to.eq('2070 Neil Ave');
      });
    });
  });

  describe('#name', function () {
    context('with hitchcock', function () {
      it('returns Hitchcock Hall', function () {
        expect(building.name()).to.eq('Hitchcock Hall');
      });
    });
  });

  describe('#orient', function () {
    context('with hitchcock', function () {
      it('returns orientation string', function () {
        expect(building.orient()).to.eq('Hitchcock Hall is located at 2070 Neil Ave');
      });
    });
  });


});