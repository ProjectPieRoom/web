define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'd3',
  'text!templates/home/popularCompanies_template.html',
  'views/company/company',
], function($, _, Backbone, Parse, d3, PopCoTemplate, CompanyView){
  var PopularCompaniesView = Parse.View.extend({
    template: _.template( PopCoTemplate ),

    initialize: function(options) {
      this.el = options.el;
      this.collection = options.companies;
      this.collection.bind('add', this.addOne);
    },

    addAll: function() {
      this.collection.forEach( this.addOne, this );
    },

    addOne: function(company) {
      var view = new CompanyView({
        model: company
      });
      $(this.el).append( view.render().$el );
    },

    render: function(){
      var data = {
        // Add data later
      };
      this.template = this.template( data );
      $(this.el).html( this.template );
      this.addAll();
      return this;
    },
  });
  // Our module now returns our view
  return PopularCompaniesView;
});
