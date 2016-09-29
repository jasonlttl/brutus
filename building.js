var method = Building.prototype;

function Building(json) {
  this.json = json;
}

method.getJson = function() {
  return this.json;
};

module.exports = Building;