'use strict';

module.exports = {
  jasmine: {
    // Your project's source files
    src: [
      'test/jasmine/app.js'
    ],
    options: {
      specs: 'test/jasmine/**/*spec.js',
      vendor: [
        'public/js/lib/underscore.js',
        'public/js/lib/handlebars.min.js',
        'public/js/lib/jquery.min.js',
        'public/js/lib/backbone.js',
        'public/js/lib/backbone.marionette.js',
        'public/js/lib/modernizer.js',
        'public/js/lib/hawk.js',
      ]
    }
  }
};
