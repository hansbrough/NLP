'use strict';
var path = require('path');
var extend = require('deap').extend;
var config = {};

// combine all the grunt configs from grunt/configs
require('fs').readdirSync('./grunt/configs').forEach(function(file) {
  if (path.extname(file) === '.js') {
    extend(config, require('./grunt/configs/' + file));
  }
});

module.exports = function(grunt) {
  //load everything starting with 'grunt-'
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // init grunt config
  grunt.initConfig(config);

  // load custom tasks
  grunt.loadTasks('grunt/tasks');

  //Default tasks - on cli just type 'grunt'
  grunt.registerTask('default', ['watch']);

  //Custom tasks - on cli type something like 'grunt jshint'
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.registerTask('test-func', ['mochaTest:func']);
  grunt.registerTask('js-linting', ['jshint']);
  grunt.registerTask('css-linting', ['csslint']);
  grunt.registerTask('album-client', 'jasmine');
  grunt.registerTask('concat_client_files', 'concat');
  grunt.registerTask('minimize_client_files', ['uglify']);
  grunt.registerTask('concat_and_min', ['concat', 'uglify']);
  grunt.registerTask('sass_and_js_minify', ['sass', 'uglify']);
  grunt.registerTask('dev', ['sass', 'concat', 'uglify']);

  //alias called by CircleCI (defined in package.json)
  grunt.registerTask('test', ['jshint', 'csslint', 'jsbeautifier']); //todo: add jasmine once working w/requirejs
};
