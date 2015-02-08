var Confidence = require('confidence');

module.exports = {
  mongodb: new Confidence.Store(require('../conf/mongodb.json')),
  api: new Confidence.Store(require('../conf/api.json')),
  www: new Confidence.Store(require('../conf/www.json'))
};
