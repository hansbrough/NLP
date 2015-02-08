'use strict';

var moment = require('moment');
var winston = require('winston');

// replace the default winston logger with our own one
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  colorize: true,
  timestamp: function() {
    return moment.utc().format('YYYY-MM-DD HH:mm:ss');
  }
});
