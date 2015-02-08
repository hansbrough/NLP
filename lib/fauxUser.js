'use strict';
/* Assisting in a temporary basic auth solution */

var users = {
  'brightsky': {
    username: 'brightsky',
    password: 'ifly_0618',
    name: 'John Doe',
    id: '2133d32a'
  },
  '9552ee18920b5b092e6d060c4c7b26fe7138321f086a8d6a221a0277a956f4c7': {
    username: 'beta_signup',
    password: 'ceaf558faceadf6d2083a541d26538f2c11adb4b83e58f678f4d4627cd5c73dc',
    name: 'beta signup',
    id: '4153d62c'
  }
};

var validate = function(username, password, callback) {
  var user = users[username],
    isValid = false;

  if (!user) {
    return callback(null, isValid);
  } else {
    isValid = (password === user.password);
    return callback(null, isValid, {
      id: user.id,
      name: user.name
    });
  }
};

module.exports = {
  users: users,
  validate: validate
};
