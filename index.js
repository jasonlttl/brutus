'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('brutus');
var FindPeople = require('./find_people');

app.launch(function(req, res) {
  var prompt = 'For contact information, tell me a name.';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('lookup_by_name', {
    'slots': {
      'FIRST': 'AMAZON.US_FIRST_NAME',
      'LAST': 'BRUTUS_US_LAST_NAME'
    },
    'utterances': [
      'where does {FIRST} {LAST} work']
  },
  function(req, res) {
    var first = req.slot('FIRST');
    var last = req.slot('LAST');
    if (_.isEmpty(first) || _.isEmpty(last)) {
      var prompt = 'First  ' + first + ',  Last ' + last ;
      res.say(prompt).reprompt(reprompt).shouldEndSession(true);
    }
    else {
      var fp = new FindPeople();
      fp.fromName(last, first).then(function(people) {
        var message = '';
        // console.log('people: %j', people);
        // res.say(people[0].first_name).send();
        //res.say(fp.format(people[0])).send();
        if (people.length > 0) {
          message = fp.format(people[0]);
        }
        else {
          message = 'I didn\'t find anyone named ' + first + ' ' + last;
        }

        console.log('people: %j', people);
        res.say(message).send();
        console.log(message);
      }).catch(function(err) {
        console.log(err.statusCode);
        var prompt = 'Daisy Daisy, Give me your answer do. I\'m half crazy, All for the love of you!';
        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
      });
    }
    return false;

  }
);

module.exports = app;