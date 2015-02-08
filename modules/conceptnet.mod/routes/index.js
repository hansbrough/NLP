/*
* ConceptNet Routes
*
*/

'use strict';

var handler = require('../handlers');

module.exports = [{
  method: 'GET',
  path: '/conceptnet/{p?}',
  handler: handler.conceptNetView,
  config: {
    plugins: {
      lout: false
    }
  }
},
{
  method: 'GET',
  path: '/c/{nodeName}/{limit?}',
  handler: handler.getConceptNode,
  config: {
    plugins: {
      lout: false
    }
  }
}];