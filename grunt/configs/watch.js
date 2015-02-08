'use strict';

module.exports = {
  watch: {
    css: {
      files: 'public/scss/**/*.scss',
      tasks: ['sass']
    },
    js: {
      files: 'public/js/apps/infinite-scroll/full/**/*.js',
      tasks: ['uglify']
    }
  }
};
