// mongoose schema for api clients
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  referrer: String,
  variant: String,
  redirect_path: String
});

module.exports = mongoose.model('redirect_tracking', schema);
