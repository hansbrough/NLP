// mongoose schema for session
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  user: Schema.Types.ObjectId,
  created: Number,
  updated: Number
});

module.exports = mongoose.model('Session', schema);
