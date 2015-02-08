var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  email: {
    type: String,
    unique: true
  },
  platform: {
    type: String
  }
});

module.exports = mongoose.model('Signup', schema);
