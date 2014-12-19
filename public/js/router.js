// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'models/AppState',
  'views/home/home_view',
  'views/loggedout/loggedout_view',
  'views/company/index_view',
  'views/admin/admin'
], function($, _, Backbone, Parse, AppState, HomeView, LoggedOutView, CompanyIndexView, AdminView){
  'use strict';

  var state = AppState.getInstance();

  var AppRouter = Parse.Router.extend({
    routes: {
      // Define some URL routes
      'search/.*': 'search',
      'x': 'loggedOut',
      'admin': 'admin',
      '.*': 'index',
      '*actions': 'index'
    },

    initialize: function(options){
      this.companies = options.companies;
    },

    //merge into index
    loggedOut: function() {
      var loggedOutView = new LoggedOutView();
      loggedOutView.render();
    },

    index: function() {
      var homeView = new HomeView();
      homeView.render();
    },

    search: function() {
      var companyIndexView = new CompanyIndexView({
        companies: this.companies,
      });
      companyIndexView.render();
    },

    admin: function() {
      var adminView = new AdminView({
        companies: this.companies
      });
      adminView.render();
    }
  });

  return AppRouter;
});