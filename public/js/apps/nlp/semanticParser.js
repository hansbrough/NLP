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
        this.setAction();
        this.setPlace();
        this.setSentenceObjects();
        return this.meaning;
      },
      /*
      * return array of integers representing the first and last idx of a pos from a given phrase.
      * posType can be a string or array of strings
      */
      getWordsByTagIdx: function(Phrase, posType){
        //console.log("getWordsByTagIdx:",Phrase, posType);
        var first = null,
            last  = null,
            pos, posIdx;
        if(Phrase && posType){
          pos = Phrase['tag-string'].split('-');
          if( _.isString(posType) ){
            posIdx = _.indexOf(pos, posType);
          }else if( _.isArray(posType) ){
            var len = posType.length;
            while(len--){
              posIdx = _.indexOf(pos, posType[len]);
              if(posIdx >=0){
                break
              }
            }
          }
          posLastIdx = _.lastIndexOf(pos, posType);
          first = Phrase.text.split(' ')[posIdx];
          last = (posLastIdx !== posIdx) ? Phrase.text.split(' ')[posLastIdx] : null;
        }
        
        return [first,last];
      },
      setAction: function(){
        var VPs   = _.where(this.syntax, {'type':'VP'});
        this.meaning.action = this.getWordsByTagIdx(VPs[0], ['VBD','VBZ','VBP'])[0];
      },
      setPlace: function(){
        var PPs = _.where(this.syntax, {'type':'PP'});
        this.meaning.place = this.getWordsByTagIdx(PPs[0], 'NN')[0];
      },
      setSubject: function(){
        var NPs       = _.where(this.syntax, {'type':'NP'});
        this.meaning.subject = this.getWordsByTagIdx(NPs[0], 'NN')[0];
      },
      setSentenceObjects: function(){
        //look for first noun phrase after a verb phrase
        var VPIdx,
            len = this.numPhrases,
            NP,PP,sentenceObjects,obj,indirectObj;
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
        obj             = sentenceObjects[0];
        indirectObj     = sentenceObjects[1];
        
        //if not found try looking for a prepositional phrase
        if(!obj || !indirectObj){
          for(var y = VPIdx;y<len;y++){
            if(this.syntax[y].type === 'PP'){
              PP = this.syntax[y];
              break;
            }
          }
          var newSentenceObjs = this.getWordsByTagIdx(PP, 'NN');
          obj = (obj) ? obj : newSentenceObjs[0];
          
          if(!indirectObj){
            if(obj && obj !== newSentenceObjs[0]){
              indirectObj = newSentenceObjs[0];
            }else{
              indirectObj = newSentenceObjs[1];
            }
          }
        }
        
        this.meaning.directObject = obj;
        this.meaning.indirectObject = indirectObj;
      }
    };

    return Parser;
});