module.exports = {
  jshint: {
    // use the project .jshint rules
    options: JSON.parse(require('fs').readFileSync('.jshintrc'), 'utf8'),
    files: {
      src: [
        '*.js',
        'grunt/**/*.js',
        'lib/**/*.js',
        'modules/**/*.js',
        'server/*.js',
        'public/js/apps/BSL.js',
        'public/js/apps/_data/**/*.js',
        'public/js/apps/static-pages/**/*.js',
        'public/js/apps/example/**/*.js',
        'public/js/apps/beta-landing/**/*.js',
        'public/js/apps/beta-signup/**/*.js',
        'public/js/apps/iphone-launch/**/*.js'
      ]
    }
  }
};
