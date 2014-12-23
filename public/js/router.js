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
  'views/admin/admin',
  'views/user/new_user_view',
  'views/user/login_view',
], function($, _, Backbone, Parse, AppState,
  HomeView, LoggedOutView, CompanyIndexView, AdminView,
  NewUserView, LoginView) {
  'use strict';

  var state = AppState.getInstance();

  var AppRouter = Parse.Router.extend({
    routes: {
      
      //Companies
      'search/.*': 'search',

      //User
      'join/:email': 'new_user',
      'login': 'login',

      //Misc
      'admin': 'admin',

      //Site Pages
      'x': 'loggedOut',
      '.*': 'index',
      '*actions': 'index'
    },

    initialize: function(options){
      this.companies = options.companies;
    },

    search: function() {
      var companyIndexView = new CompanyIndexView({
        companies: this.companies,
      });
      companyIndexView.render();
    },

    new_user: function(email) {
      var newUserView = new NewUserView({
        email: email
      });
      newUserView.render();
    },

    login: function() {
      var loginView = new LoginView({});
      loginView.render();
    },

    admin: function() {
      var adminView = new AdminView({
        companies: this.companies
      });
      adminView.render();
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
  });

  return AppRouter;
});