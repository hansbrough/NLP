define([
  'handlebars.min',
  'backbone.marionette.min',
  'backbone.marionette.overrides',
  'text!/templates/apps/NLP/partials/NLPIndex.tmpl?noext'],
  function(h,Marionette,overrides, NLPIndexTemplate){

    //compile and cache the template.
    Marionette.TemplateCache.storeTemplate('NLP_index', NLPIndexTemplate);//Look in backbone.marionette.overrides.js for details

    var layoutView = Marionette.LayoutView.extend({
      el: '.container',
      template: Marionette.TemplateCache.get('#NLP_index'),
      regions: {
        container: '.container'
      }
    });
    return layoutView;
});
