'use strict';
process.chdir(__dirname);

require('./lib/logger');
var winston = require('winston');

var clusterMaster = require('cluster-master');
var numCPUs = require('os').cpus().length;
var maxCPUs = 2;
if (numCPUs > maxCPUs) {
  numCPUs = maxCPUs;
}

clusterMaster({
  exec: "./server/index.js",
  size: numCPUs,
  slient: false,
  signals: false,
  onMessage: function(message) {
    winston.info(message);
  },
  repl: false
});
