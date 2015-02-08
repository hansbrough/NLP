module.exports = {
  jsbeautifier: {
    files: [
      '*.js',
      'grunt/**/*.js',
      'lib/**/*.js',
      'modules/**/*.js',
      'server/*.js',
      'templates/**/*.js'
    ],
    options: {
      config: './.jsbeautifyrc',
      mode: "VERIFY_AND_WRITE"
    }
  }
};
