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
      'LAST': 'BRUTUS_US_LAST_NAME'
    },
    'utterances': [
      'where does {-|FIRST} {-|LAST} work',
      'where {-|FIRST} {-|LAST} works',
      'where\'s {-|FIRST} {-|LAST} work',
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
          var message = _.template('${title_prefix} ${name_id} has an office at ${address}')({
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

module.exports = app;