'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('brutus');
var FindPeople = require('./find_people');

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
      var fp = new FindPeople();
      fp.fromName(last, first).then(function(people) {
        if (people.length > 0) {
          var appointment = FindPeople.bestAppointment(people[0].appointments);
          var message = _.template('${title_prefix} ${name_id} has an office in ${address}')({
            name_id: FindPeople.formatNameId(people[0]),
            title_prefix: FindPeople.formatTitlePrefix(appointment),
            address: FindPeople.formatAddress(people[0].address)
          });
          res.say(message).send();
        }
        else {
          res.say('I didn\'t find anyone named ' + first + ' ' + last).send();
        }


      }).catch(function(err) {
        console.log(err.message);
        res.say('Daisy Daisy, Give me your answer do. I\'m half crazy, All for the love of you!');
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
      var fp = new FindPeople();
      fp.fromUsername(last + '.' + num).then(function(people) {
        if (people.length > 0) {
          var message = _.template('${first_name} has an office in ${address}')({
            first_name: people[0].first_name,
            address: FindPeople.formatAddress(people[0].address)
          });
          res.say(message).send();
        }
        else {
          res.say('I didn\'t find anyone with a username of ' + last + '.' + num).send();
        }

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
    res.say('I think you said this building: ' + num).send();
    return false;

  }
);


module.exports = app;