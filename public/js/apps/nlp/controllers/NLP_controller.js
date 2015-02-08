define([
  'jquery.min',
  'underscore-min',
  'backbone.marionette.min',
  'backbone.marionette.overrides',
  'app/layouts/NLP_layout',
  'app/syntacticParser'],
  
  function($, _, Marionette, overrides, NLPLayout, PhraseParser){
    var $msgWin       = null,
        $talkbox      = null,
        $send         = null;
    
    //Create the Layout
    var _nlpLayout = new NLPLayout(); 
    _nlpLayout.container.on('render', function(){
      //
    });
    _nlpLayout.render();
    
    //var phraseParser = new PhraseParser();
    //console.log('phraseParser: ',phraseParser);
    //
    var Controller = Marionette.Controller.extend({
      initialize: function (options) {
        //console.info('initialize controller');
        _.bindAll(this,'index');
        
        //set node references
        $msgWin   = $('#message-window');
        $talkbox  = $('#talk-box');
        $send     = $('.send-text');
        //event handlers
        $send.on('click', function(evt){
          evt.preventDefault();
          console.log($talkbox.val());
          console.log(PhraseParser.respond( $talkbox.val() ));
          $msgWin.append($talkbox.val()+'\n');
          $talkbox.val('');
          
        });
      },
      index: function(){
        //dom event handlers

      }
    });

    return Controller;
});