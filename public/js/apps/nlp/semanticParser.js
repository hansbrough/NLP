define([
  'jquery.min',
  'underscore-min',
  'nlp.min'],
  
  function($, _){
    
    var Parser = {
      meaning:{},
      syntax:null,
      getMeaning: function(syntaxObj){
        console.log('--- SemanticParser ---');
        this.syntax = syntaxObj;
        this.setSubject();
        return this.meaning;
      },
      setSubject: function(){
        var NPs = _.where(this.syntax, {'type':'NP'}),
            firstNPs     = NPs[0],
            pos, NN, subject;
        
        pos = firstNPs['tag-string'].split('-');
        NNIdx = _.indexOf(pos, 'NN'); 
        subject = firstNPs.text.split(' ')[NNIdx];
        
        this.meaning.subject = subject;
      }
    };

    return Parser;
});