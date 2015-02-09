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
        this.numPhrases = this.syntax.length,
        this.setSubject();
        this.setSentenceObjects();
        return this.meaning;
      },
      /*
      * return array of integers representing the first and last idx of a pos from a given phrase
      */
      getWordsByTagIdx: function(Phrase, posType){
        var first = null,
            last  = null,
            pos, NNIdx;
        if(Phrase && posType){
          pos = Phrase['tag-string'].split('-');
          NNIdx = _.indexOf(pos, posType);
          NNLastIdx = _.lastIndexOf(pos, posType);
          first = Phrase.text.split(' ')[NNIdx];
          last = (NNLastIdx !== NNIdx) ? Phrase.text.split(' ')[NNLastIdx] : null;
        }
        return [first,last];
      },
      setSubject: function(){
        var NPs       = _.where(this.syntax, {'type':'NP'});
        this.meaning.subject = this.getWordsByTagIdx(NPs[0], 'NN')[0];
      },
      setSentenceObjects: function(){
        //look for first noun phrase after a verb phrase
        var VPIdx,
            len = this.numPhrases,
            NP,PP,sentenceObjects;
        for(var i =0;i<len;i++){
          if(this.syntax[i].type === 'VP'){
            VPIdx = i;
            for(var x = VPIdx;x<len;x++){
              if(this.syntax[x].type === 'NP'){
                NP = this.syntax[x];
                break;
              }
            }
            break;
          }
        };
        sentenceObjects = this.getWordsByTagIdx(NP, 'NN');
        
        //if not found try prepositional phrase
        if(!sentenceObjects[1]){
          for(var y = VPIdx;y<len;y++){
            if(this.syntax[y].type === 'PP'){
              PP = this.syntax[y];
              break;
            }
          }
          sentenceObjects[1] = this.getWordsByTagIdx(PP, 'NN')[0];
        }
        
        this.meaning.directObject = sentenceObjects[0];
        this.meaning.indirectObject = sentenceObjects[1];
      }
    };

    return Parser;
});