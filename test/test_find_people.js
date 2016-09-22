'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var FindPeople = require('../find_people');
chai.config.includeStack = true;

describe('FindPeople', function () {
  var fp = new FindPeople();

  describe('#formatResponse', function () {
    var vals = {
      "display_name": "Michael V Drake",
      "first_name": "Michael",
      "middle_name": "V",
      "last_name": "Drake",
      "name_suffix": null,
      "username": "drake.379",
      "email": "drake.379@osu.edu",
      "address": {
        "building": {
          "name": "Bricker Hall",
          "number": "001",
          "url": "http://www.osu.edu/map/building.php?building=001"
        },
        "room_number": "205 Bricker Hall",
        "street1": "190 N Oval Mall",
        "street2": null,
        "city": "Columbus",
        "state": "OH",
        "zip": "43210"
      },
      "phone": {},
      "majors": [],
      "affiliations": [
        "Faculty Employee"
      ],
      "appointments": [
        {
          "job_title": "President",
          "working_title": "President",
          "organization": "Office of the President",
          "org_code": "36000",
          "vp_college_name": "Office of the President"
        },
        {
          "job_title": "Professor",
          "working_title": "Professor",
          "organization": "Ophthalmology",
          "org_code": "25400",
          "vp_college_name": "College of Medicine"
        },
        {
          "job_title": "Professor",
          "working_title": "Professor",
          "organization": "Ed Studies Administration",
          "org_code": "12801",
          "vp_college_name": "Coll of Education & Human Ecol"
        }
      ]
    };

    context('with a status containing a delay', function () {
      it('formats the values as expected', function () {
        expect(fp.format(vals)).to.eq(
          vals.first_name + ' ' + vals.middle_name + ' ' + vals.username + ' works in ' + vals.address.room_number
        );
      });
    });
  });

  describe('#fromName', function () {
    context('with a first and last name', function () {
      it('returns a match', function () {

        var last_name = 'Drake';
        var first_name = 'Michael';
        var value = fp.fromName(last_name, first_name).then(function (obj) {
          return obj[0].last_name;
        });
        return expect(value).to.eventually.eq(last_name);
      });
    });
  });

  describe('#fromUsername', function () {
    context('with a name.n', function () {
      it('returns a match', function () {

        var username = 'drake.379';
        var value = fp.fromUsername(username).then(function (obj) {
          return obj[0].username;
        });
        return expect(value).to.eventually.eq(username);
      });
    });
  });

});