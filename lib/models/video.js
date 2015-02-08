// mongoose schema for api clients
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  end: Number,
  hashtag: String,
  path: String,
  start: Number,
  thumbnail: String,
  thumbnail_sm: String,
  uid: String
});

module.exports = mongoose.model('Video', schema);
