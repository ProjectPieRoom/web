define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'models/AppState',
  'views/components/navbar_view',
  'views/company/index_view',
  'views/company/single_company_view',
  'views/user/new_user_view',
  'views/user/login_view',
  'views/admin/admin',
  'views/loggedout/loggedout_view',
  'views/home/home_view',
], function($, _, Backbone, Parse, AppState,
  NavBarView,
  CompanyIndexView, SingleCompanyView,
  NewUserView, LoginView,
  AdminView,
  LoggedOutView, HomeView
  ) {
  'use strict';

  var state = AppState.getInstance();

  var AppRouter = Parse.Router.extend({
    routes: {
      
      //Companies
      'search/.*': 'search',
      'company/:name': 'company',

      //User
      'join/:email': 'new_user',
      'join/': 'new_user',
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
      this.navbar_view = new NavBarView();
    },

    search: function() {
      var companyIndexView = new CompanyIndexView({
        companies: this.companies,
      });
      companyIndexView.render();
      this.navbar_view.render();
    },

    company: function(query) {
      var company;
      this.companies.each(function(c) {
        if(c.get("CompanyName") == query) company = c;
      })
      var singleCompanyView = new SingleCompanyView({
        company: company,
      });
      singleCompanyView.render();
      this.navbar_view.render();
    },

    new_user: function(email) {
      var newUserView = new NewUserView({
        email: email
      });
      newUserView.render();
      this.navbar_view.render();
    },

    login: function() {
      var loginView = new LoginView({});
      loginView.render();
      this.navbar_view.render();
    },

    admin: function() {
      var adminView = new AdminView({
        companies: this.companies
      });
      adminView.render();
      this.navbar_view.render();
    },

    //merge into index
    loggedOut: function() {
      var loggedOutView = new LoggedOutView();
      loggedOutView.render();
      this.navbar_view.unrender();
    },

    index: function() {
      var homeView = new HomeView();
      homeView.render();
      this.navbar_view.render();
    },
  });

  return AppRouter;
});