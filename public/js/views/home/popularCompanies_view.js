define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'd3',
  'text!templates/home/popularCompanies_template.html',
  'views/company/company_view',
  
  //Utils
  'utils/user_utils',

  //CSS
  'css!/css/home/popularCompanies.css',
], function($, _, Backbone, Parse, d3, PopCoTemplate, CompanyView, UserUtils){
  var PopularCompaniesView = Parse.View.extend({
    template: _.template( PopCoTemplate ),

    initialize: function(options) {
      this.el = options.el;
      this.collection = options.companies;
      this.collection.bind('add', this.addOne);
      this.views = {};
    },

    addAll: function() {
      this.collection.forEach( this.addOne, this );
    },

    addOne: function(company) {
      var view = new CompanyView({
        model: company,
        parentElem: this.el
      });
      this.views[view.model.id] = view;
      view.render();
    },

    render: function() {
      var data = {
        // Add data later
      };
      this.template = this.template( data );
      $(this.el).html( this.template );
      this.addAll();
      UserUtils.getFavorites(this);
      return this;
    },

    displayFavorites: function(company_list) {
      var popView = this;
      company_list.forEach(function(model, index, arr) {
        var view = popView.views[model.id];
        if (view) {
          view.favorite();
        }
      })
    },

  });
  // Our module now returns our view
  return PopularCompaniesView;
});
