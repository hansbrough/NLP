define([
  'backbone.marionette.min',
  'app/controllers/NLP_controller'],
  
  function(Marionette, NLPController){
    //console.log('list Router');
    var _nlpController = new NLPController();

    var ModRouter = Marionette.AppRouter.extend({
        appRoutes: {
          // Define some URL routes
          '': 'index'
        },
        controller: _nlpController//route handlers defined in controller
      });

    var initialize = function(){
      //console.log("curation/search router initialize");
      new ModRouter();
    };

    return {
      initialize: initialize
    };
});