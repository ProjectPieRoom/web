define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/user/new_user_template.html',
  '../components/navbar_view',
  'css!/css/components/navbar/navbar.css',
  'css!/css/user/new_user.css',
], function($, _, Backbone, Parse, NewUserTemplate, NavBarView){
  var newUserView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( NewUserTemplate ),

    events: {
      'submit': 'onFormSubmit'
    },

    initialize: function(options) {
      this.navbar = new NavBarView({el: '#navbarDiv'});
      this.email = options.email;
    },

    onFormSubmit: function(e) {
      e.preventDefault();
      this.formFieldReset();
      var email = this.$('#email_address_input').val();
      var password = this.$('#password_input').val();
      var confirm_pass = this.$('#confirm_password_input').val();
      if(password !== confirm_pass) {
        $('#confirm_password_input').parent().addClass("has-error");
        return;
      }
      var firstName = this.$('#first_name_input').val();
      var lastName = this.$('#last_name_input').val();
      var user = new Parse.User();
      user.set("username", email);
      user.set("email", email);
      user.set("password", password);
      user.set("FirstName", firstName);
      user.set("LastName", lastName);
      if(!this.validateUserFields(user)) return;
      user.signUp(null, {
        success: function(user) {
          window.location.href = "/#/";
        },
        error: function(user, error) {
          $('#duplicate_email_text').show();
          $('#email_address_input').parent().addClass("has-error");
        }
      });
    },

    formFieldReset: function() {
      $('#duplicate_email_text').hide();
      $('#email_address_input').parent().removeClass("has-error");
      $('#password_input').parent().removeClass("has-error");
      $('#confirm_password_input').parent().removeClass("has-error");
      $('#first_name_input').parent().removeClass("has-error");
      $('#last_name_input').parent().removeClass("has-error");
    },

    validateUserFields: function(user) {
      var hasErrors = true;
      if(user.get("username") === "" || user.get("email") === "") {
        $('#email_address_input').parent().addClass("has-error");
        hasErrors = false;
      }
      if(user.get("password") === "") {
        $('#password_input').parent().addClass("has-error");
        hasErrors = false;
      }
      if(user.get("FirstName") === "") {
        $('#first_name_input').parent().addClass("has-error");
        hasErrors = false;
      }
      if(user.get("LastName") === "") {
        $('#last_name_input').parent().addClass("has-error");
        hasErrors = false;
      }
      return hasErrors;
    },

    render: function(){
      var data = {};
      this.template = this.template( data );
      this.$el.html( this.template );
      this.formFieldReset();
      if( this.email ) this.$('#email_address_input').val(this.email);
      this.navbar.render();
    }
  });
  return newUserView;
});