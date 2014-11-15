// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'models/AppState',
  'views/home/home_view',
  'views/company'
], function($, _, Backbone, Parse, AppState, HomeView, CompanyView){
  'use strict';

  var state = AppState.getInstance();

  var AppRouter = Parse.Router.extend({
    routes: {
      // Define some URL routes
      'search/.*': 'search',
      '.*': 'index',
      '*actions': 'index'
    },

    initialize: function(options){},

    index: function() {
      var homeView = new HomeView()
      homeView.render();
    },

    search: function() {
      var companyView = new CompanyView();
      companyView.render();
    }
  });

  return AppRouter;
});