'use strict';
/* Cookie convenience methods */

var _parse = function(request) {
  var list = {},
      rc = request.headers.cookie,
      rcList;
      
  if(rc){
    rcList  = rc.split(';');
    rcList.forEach(function( cookie ) {
      var parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
  }

  return list;
};

module.exports = {
  parse: _parse
};