'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
chai.config.includeStack = true;
var Person = require('../model/person');

describe('Person', function () {

  var person = new Person({
    "display_name": "Ellie O Little",
    "first_name": "Ellie",
    "middle_name": "O",
    "last_name": "Little",
    "name_suffix": null,
    "username": "little.129",
    "email": "little.129@osu.edu",
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
  });

  describe ('#firstName', function() {
    context('with first name Ellie', function () {
      it('returns Ellie', function () {
        expect(person.firstName()).to.eq('Ellie');
      });
    });
  });

  describe ('#lastName', function() {
    context('with last name Little', function () {
      it('returns Little', function () {
        expect(person.lastName()).to.eq('Little');
      });
    });
  });

  describe ('#middleName', function() {
    context('with middle name O', function () {
      it('returns O', function () {
        expect(person.middleName()).to.eq('O');
      });
    });
  });

  describe ('#username', function() {
    context('with username name little.129', function () {
      it('returns little.129', function () {
        expect(person.username()).to.eq('little.129');
      });
    });
  });

  describe('#nameId', function () {
    context('with a fullname id of Ellie O Little.129', function () {
      it('returns Ellie O little.129', function () {
        expect(person.nameId()).to.eq('Ellie O little.129');
      });
    });
  });


  describe('#titlePrefix', function () {
    context('with a title of president', function () {
      it('returns a title of president', function () {
        expect(person.titlePrefix()).to.eq('President');
      });
    });
  });

  describe('#address', function () {
    context('with a regular address', function () {
      it('formats the values as expected', function () {
        expect(person.address()).to.eq('305 Bricker Hall at 190 N Oval Mall');
      });
    });
  });

  describe('#titlePriority', function () {
    context('with president', function() {
      it('returns 9999', function() {
        expect(person.titlePriority('President')).to.eq(9999);
      });
    });
  });

  describe('#bestAppointment', function () {
    context('with multiple appointments', function() {
      it('returns the presidential appointment', function() {
        var best = person.bestAppointment();
        expect(best.job_title).to.eq('President');
      });
    });
  });

});