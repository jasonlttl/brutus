'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('brutus');
var Search = require('./search');

app.launch(function(req, res) {
  var prompt = 'For contact information, tell me a name.';
  res.say(prompt).send();
});

app.intent('LookupEmployeeByName', {
    'slots': {
      'FIRST': 'AMAZON.US_FIRST_NAME',
      'LAST': 'US_LAST_NAME'
    },
    'utterances': [
      'where does {-|FIRST} {-|LAST} work',
      'where\'s {-|FIRST} {-|LAST} work',
      'where {-|FIRST} {-|LAST} works',
    ]
  },
  function(req, res) {

    var first = req.slot('FIRST');
    var last = req.slot('LAST');

    if (_.isEmpty(first) && _.isEmpty(last)) {
      res.say('I did not understand the first and last name').send();
    }
    else if (_.isEmpty(first) && !_.isEmpty(last)) {
      res.say('I heard a first name of ' + first + ' but I did not hear the last name.').send();
    }
    else if (!_.isEmpty(first) && _.isEmpty(last)) {
      res.say('I heard a last name of ' + last + ' but I did not hear the first name.').send();
    }
    else {
      var search = new Search();
      search.personFromName(last, first).then(function(person) {
        var message = _.template('${title_prefix} ${name_id} has an office in ${address}')({
          name_id: person.nameId(),
          title_prefix: person.titlePrefix(),
          address: person.address()
        });
        res.say(message);
        res.card(person.card());
        res.send();
      });
    }
    return false;
  }
);

app.intent('LookupEmployeeByUsername', {
    'slots': {
      'LAST': 'US_LAST_NAME',
      'NUM': 'AMAZON:NUMBER'
    },
    'utterances': [
      'where does {-|LAST} dot {-|NUM} work',
      'where\'s {-|LAST} dot {-|NUM}  work',
      'where {-|LAST} dot {-|NUM}  works',
    ]
  },
  function(req, res) {

    var last = req.slot('LAST');
    var num = req.slot('NUM');

    if (_.isEmpty(last) && _.isEmpty(num)) {
      res.say('I did not understand the last name and number').send();
    }
    else if (_.isEmpty(last) && !_.isEmpty(num)) {
      res.say('I heard a number of ' + num + ' but I did not hear the last name.').send();
    }
    else if (!_.isEmpty(last) && _.isEmpty(num)) {
      res.say('I heard a last name of ' + last + ' but I did not hear the number.').send();
    }
    else {
      var search = new Search();
      search.personFromUsername(last + '.' + num).then(function(person) {
        var message = _.template('${first_name} has an office in ${address}')({
          first_name: person.firstName(),
          address: person.address()
        });
        res.say(message);
        res.card(person.card());
        res.send();
      }).catch(function(err) {
        console.log(err.message);
        res.say('Daisy Daisy, Give me your answer do. I\'m half crazy, All for the love of you!');
      });
    }
    return false;

  }
);

app.intent('OrientBuildingByName', {
    'slots': {
      'BUILDING_NAME': 'BUILDING_NAME'
    },
    'utterances': [
      'where is {-|BUILDING_NAME}',
      'where\'s {-|BUILDING_NAME}',
      '{how |} to get to {the |} {-|BUILDING_NAME}',
      '{how |} to find {the |} {-|BUILDING_NAME}'
    ]
  },
  function(req, res) {

    var building = req.slot('BUILDING_NAME');
    res.say('I think you said this building: ' + building).send();
    return false;

  }
);

app.intent('OrientBuildingByNum', {
    'slots': {
      'NUM': 'AMAZON:NUMBER'
    },
    'utterances': [
      'where is building {-|NUM}',
      'where\'s building {-|NUM}',
      'what is building {-|NUM}',
      'what\'s building {-|NUM}',
      '{how |} to get to building {-|NUM}',
      '{how |} to find building {-|NUM}'
    ]
  },
  function(req, res) {

    var num = req.slot('NUM');

    if (_.isEmpty(num)) {
      res.say('I did not understand the building number').send();
    }
    else {
      var search = new Search();
      search.buildingFromCode(num).then(function(building) {
        if (building) {
          res.say(building.orientNum());
          res.card(building.card());
          res.send();
        }
        else {
          res.say('I didn\'t find a building with number ' + num).send();
        }

      }).catch(function(err) {
        console.log(err.message);
        res.say('Daisy Daisy, Give me your answer do. I\'m half crazy, All for the love of you!');
      });
    }
    return false;

  }
);


module.exports = app;