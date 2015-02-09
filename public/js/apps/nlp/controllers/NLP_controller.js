define([
  'jquery.min',
  'underscore-min',
  'backbone.marionette.min',
  'backbone.marionette.overrides',
  'app/layouts/NLP_layout',
  'app/syntacticParser',
  'app/semanticParser'],
  
  function($, _, Marionette, overrides, NLPLayout, SyntacticParser, SemanticParser){
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
          $msgWin.append($talkbox.val()+'\n\n');
          
          //Syntax 
          var syntax = SyntacticParser.respond( $talkbox.val() );
          //todo: this just for debug
          for(var i =0; i<syntax.length;i++){
            var pos = syntax[i],
                respStr = '"'+pos.text+'" is a '+ pos.type+ ' ('+pos["tag-string"]+')';
            $msgWin.append(respStr+'\n');
          }
          
          //Semantics
          var meaning = SemanticParser.getMeaning(syntax);
          console.log(meaning);
          //todo: this just for debug
          $msgWin.append('\n --Meaning-- \n');
          for(var i in meaning){
            $msgWin.append(i+' = '+meaning[i]+'\n');
          }
          $talkbox.val('');
          
        });
      },
      index: function(){
        //dom event handlers

      }
    });

    return Controller;
});