'use strict';

module.exports = function(grunt) {

  grunt.registerTask('album-client', 'Client side tests for the Album Cover single page app', function() {
    grunt.task.run('jasmine');
  });

};
