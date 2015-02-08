var assert = require('chai').assert;
var Hapi = require('hapi');
var pkg = require('../../package.json');

var server = new Hapi.Server();
server.route(require('../../modules/album.mod/routes'));

describe('album/cover', function() {
  it('should return Album Cover', function(done) {
    server.inject('/album/cover', function(res) {
      assert.notEqual(res.result, null, 'Got no results');
      assert.equal(res.result, 'Album Cover', 'invalid status');
      return done();
    });
  });
});
