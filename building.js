var method = Building.prototype;

function Building(json) {
  this.json = json;
}

method.getJson = function() {
  return this.json;
};

method.orient = function() {
  return this.name() + ' is located at ' + this.streetAddress();
}

method.name = function() {
  return this.json.name;
}

method.streetAddress = function() {
  var val = this.json.location.address;
  if (this.json.location.address2) {
    val += ' ' + this.json.location.address2;
  }
  return val;
}

module.exports = Building;