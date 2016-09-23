'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var FindPeople = require('../find_people');
chai.config.includeStack = true;

describe('FindPeople', function () {
  var fp = new FindPeople();
  var person = {
    "display_name": "Ellie V Drake",
    "first_name": "Ellie",
    "middle_name": "V",
    "last_name": "Drake",
    "name_suffix": null,
    "username": "drake.389",
    "email": "drake.389@osu.edu",
    "address": {
      "building": {
        "name": "Bricker Hall",
        "number": "001",
        "url": "http://www.osu.edu/map/building.php?building=001"
      },
      "room_number": "305 Bricker Hall",
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

  describe('#formatNameId', function () {
    context('with a middle name', function () {
      it('formats the values as expected', function () {
        expect(FindPeople.formatNameId(person)).to.eq(
          person.first_name + ' ' + person.middle_name + ' ' + person.username
        );
      });
    });
  });

  describe('#formatTitlePrefix', function () {
    context('with a title of president', function () {
      it('returns a title of president', function () {
        var best = FindPeople.bestAppointment(person.appointments);
        expect(FindPeople.formatTitlePrefix(best)).to.eq('President');
      });
    });
  });

  describe('#formatAddress', function () {
    context('with a regular address', function () {
      it('formats the values as expected', function () {
        expect(FindPeople.formatAddress(person.address)).to.eq('305 Bricker Hall 190 N Oval Mall');
      });
    });
  });

  describe('#bestAppointment', function () {
    context('with multiple appointments', function() {
      it('returns the presidential appointment', function() {
        var best = FindPeople.bestAppointment(person.appointments);
        expect(best.job_title).to.eq('President');
      });
    });
  });

  describe('#titlePriority', function () {
    context('with president', function() {
      it('returns 9999', function() {
        expect(FindPeople.titlePriority('President')).to.eq(9999);
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