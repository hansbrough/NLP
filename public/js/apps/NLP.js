/*global Handlebars*/
/*jslint browser:true, unused:false */
/*--- 
* Establish NameSpace 
* add basic mediator for custom events
* add convenience methods
---*/
define(['jquery','underscore-min','backbone.min','handlebars.min'],
function ($, _, Backbone, Handlebars) {

  var BrightSkyLabs = {
    vent: _.extend({}, Backbone.Events),
    regex: {
      email:/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/
    },
    getTemplate: function(path, cb){
      var source,
          template;

      $.ajax({
        url: path,
        success: function(data) {
          source    = data;
          template  = Handlebars.compile(source);

          //execute the callback if passed
          if (cb){
            cb(template);
          }
        }.bind(this)
      });
    },
    getObjectDelta: function(prev, now) {
      var changes = {};
      if(prev){
        for (var prop in now) {
          if (!prev || prev[prop] !== now[prop]) {
            if (typeof now[prop] === "object") {
              var c = this.getObjectDelta(prev[prop], now[prop]);
              if (! _.isEmpty(c) ){ // underscore
                changes[prop] = c;
              }
            } else {
              changes[prop] = now[prop];
            }
          }
        }
        if( _.isEmpty(changes) ){
          changes = null;
        }
      }else{
        changes = now;
      }
      return changes;
    },
    injectScriptTagIntoHead: function(scriptSelector){
      if(scriptSelector){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = $(scriptSelector).text();
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    },
    loadCSS: function(href){
      var ss    = window.document.createElement('link'),
          head  = window.document.getElementsByTagName('head')[0];

      ss.rel = 'stylesheet';
      ss.href = href;

      // temporarily, set media to something non-matching to ensure it'll
      // fetch without blocking render
      ss.media = 'x';

      head.appendChild(ss);

      setTimeout( function(){
        // set media back to `all` so that the stylesheet applies once it loads
        ss.media = 'screen';
      },0);
    }
  };
  
  /* -- Register Handlebar Helpers--*/
  Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {
    if (arguments.length < 3){
      throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }
    var operator	= options.hash.operator || "==",
        result,
        operators	= {
          '==': function(l,r) { return l === r; },
          '===': function(l,r) { return l === r; },
          '!=': function(l,r) { return l !== r; },
          '<': function(l,r) { return l < r; },
          '>': function(l,r) { return l > r; },
          '<=': function(l,r) { return l <= r; },
          '>=': function(l,r) { return l >= r; },
          'typeof': function(l,r) { return typeof l === r; }
        };

    if (!operators[operator]){
      throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);
    }

    result = operators[operator](lvalue,rvalue);

    if( result ) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }

  });

  Handlebars.registerHelper("uc", function(string_to_encode) {
    return encodeURIComponent(string_to_encode);
  });
  
  return BrightSkyLabs;
});