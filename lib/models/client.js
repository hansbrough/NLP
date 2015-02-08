// mongoose schema for api clients
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  key: {
    type: String,
    unique: true
  },
  secret: String,
  created: Number,
  updated: Number
});

schema.path('key').set(function(v) {
  this.created = new Date().getTime();
  this.updated = new Date().getTime();
});

module.exports = mongoose.model('Client', schema);
