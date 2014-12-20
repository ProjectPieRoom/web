define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/user/login_template.html',
  'text!templates/user/login_css.html',
  '../components/navbar_view',
], function($, _, Backbone, Parse, LoginTemplate, LoginCSS, NavBarView){
  var loginView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( LoginTemplate ),
    cssTemplate: _.template( LoginCSS ),

    events: {
      'submit': 'onFormSubmit'
    },

    initialize: function() {
      this.navbar = new NavBarView({el: '#navbarDiv'});
    },

    onFormSubmit: function(e) {
      e.preventDefault();
      this.formFieldReset();
      var email = this.$('#email_address_input').val();
      var password = this.$('#password_input').val();
      Parse.User.logIn(email, password, {
        success: function(user) {
          window.location.href = "/#/";
        },
        error: function(user, error) {
          $('#incorrect_credentials_div').show();
        }
      });
    },

    formFieldReset: function() {
      $('#incorrect_credentials_div').hide();
      $('#email_address_input').parent().removeClass("has-error");
      $('#password_input').parent().removeClass("has-error");
    },

    render: function(){
      var data = {};
      this.template = this.template( data );
      this.$el.html( this.template );
      this.formFieldReset();
      this.navbar.render();
    }
  });
  return loginView;
});