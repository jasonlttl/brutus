'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var FindPeople = require('../find_people');
chai.config.includeStack = true;

describe('FindPeople', function () {
  var fp = new FindPeople();

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