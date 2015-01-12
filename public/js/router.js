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
  'views/user/profile_view',
  'views/user/common_application_view',
  'views/user/common_application_edit_view',
], function($, _, Backbone, Parse, AppState,
  NavBarView,
  CompanyIndexView, SingleCompanyView,
  NewUserView, LoginView,
  AdminView,
  LoggedOutView, HomeView, ProfileView,
  CommonApplicationView, CommonApplicationEditView
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
      'profile': 'profile',
      'common_app/view': 'view_resume',
      'common_app/edit': 'edit_resume',

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

    profile: function() {
      var profileView = new ProfileView({});
      profileView.render();
    },

    view_resume: function() {
      var commonAppView = new CommonApplicationView({});
      commonAppView.render();
    },

    // TO DO: Add in editing for resume
    edit_resume: function() {
      var commonAppEditView = new CommonApplicationEditView({});
      commonAppEditView.render();
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