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

method.orientNum = function() {
  return 'Building ' + this.code() + ', ' + this.name() + ', is located at ' + this.streetAddress();
}

method.name = function() {
  return this.json.name;
}

method.code = function() {
  return this.json.building_code;
}

method.streetAddress = function() {
  var val = this.json.location.address;
  if (this.json.location.address2) {
    val += ' ' + this.json.location.address2;
  }
  return val;
}

method.photoUrl = function() {
  return this.json.photo_url.replace('http', 'https');
}

method.card = function() {
  var card =
  {
    type: "Standard",
    title: this.name(),
    text: this.streetAddress(),
    image: {
      smallImageUrl: this.streetview(),
      largeImageUrl: this.streetview()
    }
  }
  return card;
}

method.latitude = function() {
  return this.getJson().location.latitude;
}
method.longitude = function() {
  return this.getJson().location.longitude;
}

method.streetview = function() {
  return 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + encodeURI(this.streetAddress()) + '%20Columbus,%20OH%2043201';
}

module.exports = Building;