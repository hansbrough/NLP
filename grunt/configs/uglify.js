'use strict';

module.exports = {
  uglify: {
    options: {
      'mangle-toplevel': true,
      compress: {
        drop_console: true
      }
    },
    files: {
      src: '**/*.js',// source files mask
      dest: 'public/js/apps/infinite-scroll/min/',// destination folder
      cwd: 'public/js/apps/infinite-scroll/full/',// specify working directory
      expand: true,// allow dynamic building
      ext: '.min.js'// replace .js to .min.js
    }
  }

};
