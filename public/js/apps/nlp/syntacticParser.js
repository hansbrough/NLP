define([
  'jquery.min',
  'underscore-min',
  'nlp.min'],
  
  function($, _){
    //
    var phraseDict  = {
      'DT-JJ-JJ-NN':'NP','DT-JJ-NN':'NP','DT-JJR-NN':'NP','DT-JJS-NN':'NP','DT-NN':'NP','NN':'NP','PRP':'NP',
      'IN-DT-NN':'PP','IN-NN':'PP','IN':'PP',
      'CP-VBG':'VP','RB-VBD':'VP','VBZ':'VP','VBD':'VP','VBP':'VP','VB':'VP','MD':'VP',
      'DT-CP-DT-JJ':'QP'
    },
    NLP = null;
    
    var Parser = {
      respond: function(text){
        console.log('respond');
        var pos = this.map(text);
        var syntax = this.getPhrases(pos[0]);
        console.log("////----- Parser.respond -----////");
        console.log(syntax);
      },
      map: function(text){
        NLP = nlp.pos(text);
        var sentences = NLP.sentences,
            len       = sentences.length,
            pos_list  = [];
        console.log(NLP);
        for(var i =0;i<len;i++){
          var tokens      = sentences[i].tokens,
              tokensLen   = tokens.length,
              tokensList  = [];
          for(var x=0;x<tokensLen;x++){
            var set = [tokens[x].pos.tag, tokens[x].text]
            tokensList.push(set);
          }
          pos_list.push(tokensList);
        }
        return  pos_list;
      },
      //one loop through a tag array looking for phrases
      checkTagsForPhrases: function(pos){
        var len     = pos.length;
        //separate tag and corresponding text items into different arrays    
        var pos_list = _.map(pos, function(item) {
          return item[0];
        });
        
        var text_list = _.map(pos, function(item) {
          return item[1];
        });
        
        console.log("checkTagsForPhrases", pos_list, text_list);
        var start   = 0,
            phrases = []; 
                  
        for(var i=0;i<=len;i++){
          console.log('...iteration: ',i);
          tagStr = this.makeString(pos_list,{trim_points:{start:start,end:i}});
          var phrase = this.isPhrase(tagStr);
          //note: lookahead shouldnt just happen if a phrase is found
          //it should happen for every iteration eg 'in the park john threw the ball' would skip 'in'
          //so maybe recurse to end of sentence for every start tag - less proficient but more thorough.
          //essentially rework the below ...
          if(phrase){
            //if found look ahead to next tag for possible further match. e.g. 'down the street' vs just 'down'
            console.log(".....phraseFound now lookAhead");
            var candidate = this.lookAhead(pos_list, start, i, {phrase:phrase, tagStr:tagStr} );
            console.log("..... candidate returned from lookAhead:",candidate);
            start = i;
            if(candidate){
              console.log('...... candidate: ',candidate);
              phrase  = candidate.phrase;
              tagStr  = candidate.tagStr;
              start   = candidate.start;
              i       = candidate.end;
            }
            //concat text items into a text snippet
            var text_snippet      = this.makeString(text_list, {delimiter:' ', trim_points:{start:start,end:i}});
            //add results to existing sentence phrases.
            phrases.push({'type':phrase,'tag-string':tagStr,'text':text_snippet});
            //reset starting point of next phrase search.
            if(candidate){
              start = candidate.end;
            }
          }
        }
        
        if(phrases.length === 0){
          console.log('......phrase not found')
          this.checkTagsForPhrases( pos.slice(1, len));
        }
        
        //console.log('...phrases: ',phrases);
        return phrases;
      },
      getPhrases: function(pos){
        console.log('getPhrases: ',pos)
        var tagStr,
            sentencePhrases = [],
            len     = pos.length;
        
        var phrases= this.checkTagsForPhrases(pos);
        
        //possible to find no phrases on the first pass
        //recurse - sans first tag.
        if(phrases.length === 0){
          console.log('phrase not found')
          this.checkTagsForPhrases( pos.slice(1, len));
        }
        sentencePhrases = sentencePhrases.concat(phrases);
        return sentencePhrases;
      },
      isPhrase: function(pattern){
        console.log("isPhrase: ",pattern);
        var isPhrase = false;
        if(phraseDict[pattern]){
          isPhrase = phraseDict[pattern];
        }
        //console.log('... returning:',isPhrase);
        return isPhrase;
      },
      /*
       * Get new phrase derived from looking ahead at next pos tags - if no match return null.
       * lookAhead should examine 'n' tags ahead for a match
       * e.g. 'around' matches, 'around the' doesn't match but 'around the town' does match
       * w/out looking several tags ahead potential matches will missed.
       */
      lookAhead: function(list, startIdx, endIdx, existing, iteration){
        console.log("lookAhead:",list, startIdx, endIdx, existing, iteration);
        existing = existing || null;
        iteration = iteration || 0;
        var nextEndIdx  = endIdx+1,
            tagStr      = this.makeString(list, {trim_points:{start:startIdx, end:nextEndIdx}}),
            phrase      = this.isPhrase(tagStr),
            phraseInfo;
          
        if(phrase){
          iteration++;
          console.log('..... lookAhead - incremented phrase found:',phrase);
          if(nextEndIdx <= list.length){
            console.log('..... lookAhead - more to increment');
            return this.lookAhead(list, startIdx, nextEndIdx, {phrase:phrase,tagStr:tagStr},iteration);
          }else{//out of tags - exit.
            console.log('..... lookAhead exiting - no more to increment.',{phrase:phrase, tagStr:tagStr, start:startIdx, end:endIdx});
            phraseInfo = {phrase:phrase, tagStr:tagStr, start:startIdx, end:endIdx};
            //console.log("....... returning phraseInfo:",phraseInfo);
            return phraseInfo;
          }
        }else{
          iteration++;
          if(iteration < 2){
            console.log('....... no match found but keep looking - iteration:',iteration);
            return this.lookAhead(list, startIdx, nextEndIdx, existing,iteration);//recursive funcs need to return value back up scope chain.
          }else{
            console.log('...lookAhead exiting with: ',existing);
            //last phrase search unsuccessful - return last good values. e.g. endIdx needs to be decremented.
            //phraseInfo = (existing) ? {phrase:existing.phrase, tagStr:existing.tagStr, start:startIdx, end:(endIdx-1)} : null;
            return (existing) ? {phrase:existing.phrase, tagStr:existing.tagStr, start:startIdx, end:(endIdx-1)} : null;
          }
        }
        
        console.log("....... returning phraseInfo:",phraseInfo);
        return phraseInfo;
      },
      makeString: function(tags, options){
        console.log('makeString:',tags,options);
        options = options || {};
        var delimiter = options.delimiter || '-';
        if(options.trim_points){
          tags = tags.slice(options.trim_points.start, options.trim_points.end);
        }
        var tagStr = tags.join(delimiter);
        console.log('...',tagStr);
        return tagStr;
      }
    };

    return Parser;
});