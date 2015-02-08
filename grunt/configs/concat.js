'use strict';

module.exports = {
  concat: {
    dist: {
      src: [
        'public/js/lib/modernizr.js', // All JS in the libs folder
        'public/js/apps/static-pages/BSL.Static.Header.js' // This specific file
      ],
      dest: 'public/js/build/production.js',
    }
  }
};
