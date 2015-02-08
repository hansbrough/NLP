/*jshint -W030 */
/*
* ConceptNet Handlers
*
*/

'use strict';
var ConceptNet  = require('concept-net'),
    conceptNet  = ConceptNet();

module.exports.conceptNetView = function(request, reply){
  var payload     = {
    pageTitle: 'ConceptNet Test'
  };
      
  conceptNet.lookup("/c/en/toast",{
    limit: 10,
    offset: 0,
    filter: "core"}, function(err, result){
      payload.concept = result;
      reply.view('concept_net', payload);
    });
          
};

module.exports.getConceptNode = function(request, reply){
  var nodeName        = request.params.nodeName,
      limit           = request.params.limit || 10;
      
  conceptNet.lookup("/c/en/"+nodeName,{
    limit: limit,
    offset: 0,
    filter: "core"}, function(err, result){
      reply(result);
      
    });
};