define([
  //Libraries
  'jquery',
  'underscore',
  'backbone',
  'parse',

  //Templates
  'text!templates/home/home_template.html',
  
  //Views
  './favoriteCompanies_view',
  './popularCompanies_view',

  //Collections
  'collections/company/companies_collection',

  //CSS
  'css!/css/components/navbar/navbar.css',
  'css!/css/home/home.css',
], function($, _, Backbone, Parse, HomeTemplate, FavoriteCompaniesView, PopularCompaniesView, CompaniesCollection, UserUtils){
  var HomeView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( HomeTemplate ),

    initialize: function() {
      this.favCoView = new FavoriteCompaniesView({el: '#favoriteCompaniesDiv'});
      var companies = new CompaniesCollection();
      companies.fetch({
        success: function(collection) {
          this.popCoView = new PopularCompaniesView({el: '#popularCompaniesDiv', companies: companies});
          this.popCoView.render();
        },
        error: function(collection, error) {
          console.log("error retrieving companies")
        }
      });
    },

    render: function() {
      var data = {};
      this.template = this.template( data );
      this.$el.html( this.template );
      this.favCoView.render();
    }
  });
  return HomeView;
});