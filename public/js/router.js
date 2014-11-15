// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'layoutmanager',
  'models/AppState',
  'layouts/home/home_layout',
  'views/company'
], function($, _, Backbone, Parse, Layout, AppState, HomeLayout, CompanyView){
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
      var homeLayout = new HomeLayout();
      $("body").empty().append(homeLayout.template())
      homeLayout.render();
    },

    search: function() {
      var companyView = new CompanyView();
      companyView.render();
    }
  });

  return AppRouter;
});