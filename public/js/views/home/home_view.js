define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/home/home_template.html',
  '../components/navbar_view',
  './favoriteCompanies_view',
  './popularCompanies_view',
  'collections/company/companies_collection',

  //CSS
  'css!/css/components/navbar/navbar.css',
  'css!/css/home/home.css',
], function($, _, Backbone, Parse, HomeTemplate, NavBarView, FavoriteCompaniesView, PopularCompaniesView, CompaniesCollection){
  var HomeView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( HomeTemplate ),

    initialize: function() {
      this.navbar = new NavBarView({el: '#navbarDiv'});
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
      this.navbar.render();
      this.favCoView.render();
    }
  });
  return HomeView;
});