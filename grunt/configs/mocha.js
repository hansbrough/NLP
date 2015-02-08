'use strict';

module.exports = {
  mochaTest: {
    func: {
      options: {
        timeout: 8000,
        slow: 1000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      src: ['test/func/**/*.js']
    }
  }
};
