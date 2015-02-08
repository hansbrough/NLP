//Define an AMD module
//example is copied code from NLP.js inside a require.js define method
//it loads the Marionette dependency which in turn loads it's dependency Backbone and so on...
//look in /templates/views/basic_app.tmpl which references main.js (contains info on script dependences)

define([
  'backbone.min',
  'backbone.marionette.min',
  'app/routers/NLP_router',
  'moz.cookie.lib'],
  function (Backbone, Marionette, NLPRouter, CookieLib) {

  //define curation app and it's modules
  var NLPApp       = new Marionette.Application(),
      listModule      = NLPApp.module("List", function(List, NLP){
        List.Router = NLPRouter.initialize();
      });

  NLPApp.key = 'nlp';
  NLPApp.addInitializer(function(options){
    Backbone.history.start();
  });

	NLPApp.on("before:start", function(options){
	  //console.info('NLP before start');
    NLPApp.cookie = null;
    var list        = {},
        cookie;    
    document.cookie.split(';').forEach(function( cookie ) {
      var parts = cookie.split('=');
      list[parts.shift().trim()] = unescape(parts.join('='));
    });
    cookie = list[NLPApp.key];
    if(cookie){
      NLPApp.cookie = JSON.parse(atob(cookie));
    }
	});

  //App modules persist their pertinents here
  NLPApp.setCookie = function(config){
    //console.log("NLPApp.setCookie config:",config);
    var newCookie;
    for(var i in config){
      NLPApp.cookie[i]=config[i];
    }
    //base64 encode and persist
    newCookie = btoa(JSON.stringify(NLPApp.cookie));
    CookieLib.setItem(NLPApp.key, newCookie, Infinity, '/');
  };
  
	return NLPApp;
});