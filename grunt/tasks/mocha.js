'use strict';

module.exports = function(grunt) {

  grunt.registerTask('test-func', 'determine which functional tests to run and run them', function() {
    grunt.task.run('mochaTest:func');
  });

};
