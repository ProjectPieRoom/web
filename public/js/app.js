// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'parse',
  'collections/company/companies_collection'
], function($, _, Backbone, AppRouter, Parse, CompaniesCollection){
  var initialize = function(){
    var companies = new CompaniesCollection();
    companies.fetch({
      success: function(collection) {
        new AppRouter({
          companies: collection
        });

        Parse.history.start();
      },
      error: function(collection, error) {
        console.log("error retrieving companies")
      }
    })
  }

  return {
    initialize: initialize
  };
});