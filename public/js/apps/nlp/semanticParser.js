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
        this.phraseMap = this.getPhraseMap();
        this.setSubject();
        this.setAction();
        this.setPlace();
        this.setSentenceObjects();
        this.setTime();
        this.setManner();
        this.setReason();
        return this.meaning;
      },
      /*
      * return a ordered, concatenated list of phrases from a given sentence.
      */
      getPhraseMap: function(){
        var map = _.map(this.syntax, function(item){
          return item.type;
        });
        return map.join('-');
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
      setManner: function(){
        var phraseMap = this.phraseMap,
            manner = null;
        console.log('setManner: ', phraseMap);
        //look in 3 places
        
        //1. PP ex. 'Jim runs with ease'
        
        //2. VP ex. 'Jim quickly runs'
        
        //3. AP following VP ex. 'Jim runs very fast'
        var phraseStrIdx = phraseMap.search(/(VP\-AP)/),
            nonMatch = phraseMap.substr(0,phraseStrIdx),
            phraseIdx = nonMatch.split('-').length,//get index after matching verb phrase
            matchingAP  = this.syntax[phraseIdx];
            manner = matchingAP.text;
        //console.log('...',phraseStrIdx, nonMatch, phraseIdx, matchingAP);
        
        this.meaning.manner = manner;
      },
      setPlace: function(){
        var PPs = _.where(this.syntax, {'type':'PP'});
        this.meaning.place = this.getWordsByTagIdx(PPs[0], 'NN')[0];
      },
      setReason: function(){
        this.meaning.reason = null;
      },
      setSubject: function(){
        var NPs       = _.where(this.syntax, {'type':'NP'});
        this.meaning.subject = this.getWordsByTagIdx(NPs[0], ['PRP','NN'])[0];
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
      },
      setTime: function(){
        this.meaning.time = null;
      }
    };

    return Parser;
});