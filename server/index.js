'use strict';

var winston = require('winston'),
  Hapi = require('hapi'),
  mongoose = require('mongoose'),
  Basic = require('hapi-auth-basic'),
  config = require('../lib/config'),
  fauxUsers = require('../lib/fauxUser');

var env = process.env.NODE_ENV || 'dev',
  dbConfig = config.mongodb.get('/', {
    env: env
  }),
  port = 5000,
  options = {
    cors: true,
    views: {
      engines: {
        tmpl: require('handlebars')
      },
      path: './templates/views',
      partialsPath: './templates/partials',
      helpersPath: './templates/helpers'
    }
  },
  server = new Hapi.Server('0.0.0.0', port, options);

server.app.pkg = require('../package.json');

//setting configs for individual cookies
server.state('bsl-data', {
  ttl: 24 * 60 * 60 * 1000,
  isSecure: false,
  isHttpOnly: true,
  path: '/',
  encoding: 'base64json'
});

server.state('bsl-influencer', {
  ttl: 24 * 60 * 60 * 1000,
  isSecure: false,
  isHttpOnly: false,
  path: '/',
  encoding: 'base64json'
});

//register the basic auth plugin before route definitions
//authentication headers are automatically decrypted and passed to the validation function below.
server.pack.register(Basic, function(err) {
  server.auth.strategy('simple', 'basic', {
    validateFunc: fauxUsers.validate
  });
});

/* --- ROUTES --- */
server.route(require('../modules/conceptnet.mod/routes'));

// static resources
server.route([{
  method: 'GET',
  path: '/components/{path*}',
  handler: {
    directory: {
      path: './public/components'
    }
  },
  config: {
    plugins: {
      lout: false
    }
  }
}, {
  method: 'GET',
  path: '/css/{path*}',
  handler: {
    directory: {
      path: './public/css'
    }
  }
}, {
  method: 'GET',
  path: '/fonts/{path*}',
  handler: {
    directory: {
      path: './public/fonts'
    }
  }
}, {
  method: 'GET',
  path: '/img/{path*}',
  handler: {
    directory: {
      path: './public/img'
    }
  }
}, {
  method: 'GET',
  path: '/js/{path*}',
  handler: {
    directory: {
      path: './public/js'
    }
  }
}, {
  method: 'GET',
  path: '/videos/{path*}',
  handler: {
    directory: {
      path: './public/video',
      listing: true
    }
  }
}, {
  method: 'GET',
  path: '/player/{path*}',
  handler: {
    directory: {
      path: './public/player'
    }
  }
}, {
  method: 'GET',
  path: '/mock/{path*}',
  handler: {
    directory: {
      path: './public/mock'
    }
  },
  config: {
    plugins: {
      lout: false
    }
  }
}, {
  method: 'GET',
  path: '/sitemaps/{path*}',
  handler: {
    directory: {
      path: './public/sitemaps'
    }
  },
  config: {
    plugins: {
      lout: false
    }
  }
}, {
  method: 'GET',
  path: '/templates/{path*}',
  handler: {
    directory: {
      path: './templates'
    }
  },
  config: {
    plugins: {
      lout: false
    }
  }
}]);

// handle class
mongoose.connect(dbConfig.url, dbConfig.options, function(err) {
  if (err) {
    // throw error
    throw err;
  }
  // register plugins
  server.pack.register(
    [{
      plugin: require('hapi-auth-hawk')
    }, {
      plugin: require('lout')
    }],
    function() {
      server.start(function() {
        winston.info('starting server on ' + port);
      });
    }
  );
});