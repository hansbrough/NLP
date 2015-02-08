var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  email: {
    type: String,
    unique: true
  },
  profile: Schema.Types.Mixed,
  social_accounts: [Schema.Types.Mixed],
  created: Number,
  updated: Number
});

module.exports = mongoose.model('User', schema);
