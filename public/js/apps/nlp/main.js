//Setup script dependencies
//the 'NLP.module' js file is the 'app' logic and depends on several
//other files to load and initialize first (marionette,backbone,underscore...)
//shim object provides support for non-AMD ready lib files like Backbone

requirejs.config({
		//By default load any module IDs from js/lib
		baseUrl: '/js/lib',
		//never includes a ".js" extension since
		//the paths config could be for a directory.
		paths: {
			app: '/js/apps/nlp',
			templates: '/templates'
		},
		shim: {
			'modernizr': {
				exports: 'Modernizr'
			},
			'backbone.min': {
				//dependencies to load before backbone
				deps: ['underscore', 'jquery.min'],
				exports: 'Backbone'
			},
			'backbone.marionette.min': {
				//dependencies to load before marionette
				deps: ['backbone.min'],
				exports: 'Marionette'
			},
			'backbone.marionette.overrides': {
				//dependencies to load before marionette overrides
				deps: ['backbone.marionette.min']
			},
			'jquery.min': {
				exports: '$'
			},
			'underscore-min': {
				exports: '_'
			},
			'handlebars.min': {
				exports: 'Handlebars'
			},
			'nlp.min.js': {
				exports: 'nlp'
			}
		}
});

var NLP = {};//Establish global namespace

require(['app/NLPApp','nlp.min'],
function(app, nlp) {
  //console.log("NLP Main - All files loaded.");
  //create a global namespace for the app
  NLP = app;
  //all files loaded - now kick off the app.
  NLP.start();
});
