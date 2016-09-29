var rp = require('request-promise');
var options = {
  method: 'GET',
  uri: 'https://kmdata.osu.edu/api/buildings.json?building_code=274&include=location',
  resolveWithFullResponse: true,
  json: true,
  timeout: 1500
};
rp(options)
  .then(function (response) {
    console.log('User has %d repos', buildings.length);
    console.log(buildings);
  })
  .catch(function (err) {
    console.log('an error occurred');
    console.log(err);
  })
  .finally(function() {
    console.log('all done now?');
  });