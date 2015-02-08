'use strict';

module.exports = {
  sass: {
    dist: {
      options: {
        style: 'expanded'
      },
      files: [{
        expand: true,
        cwd: 'public/scss/',
        src: ['**/*.scss'],
        dest: 'public/css/',
        ext: '.css'
      }]
    }
  }
};
