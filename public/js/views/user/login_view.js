define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/user/login_template.html',
], function($, _, Backbone, Parse, LoginTemplate){
  var loginView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( LoginTemplate ),

    events: {
      'submit': 'onFormSubmit',
      'click #facebook_signup_button': 'facebookLogin'
    },

    initialize: function(options) {
    },

    //See copy in signup. need to merge eventually to prevent code dup
    facebookLogin: function() {
      Parse.FacebookUtils.logIn('public_profile,user_friends,email', {
        success: function(user) {
          if (!user.existed()) {
            FB.api('/me', {fields: 'first_name, last_name, email'}, function(response) {
              console.log(response);
              user.set("username", response.email);
              user.set("email", response.email);
              user.set("FirstName", response.first_name);
              user.set("LastName", response.last_name);
              user.save(null, {
                success: function(user) {
                  window.location.href = "/#/";
                },
                error: function(user, error) {
                  // Execute any logic that should take place if the save fails.
                  // error is a Parse.Error with an error code and message.
                  alert('Failed to create new object, with error code: ' + error.message);
                }
              });
            });
          } else {
            //alert("User logged in through Facebook!");
            window.location.href = "/#/";
          }
          
        },
        error: function(user, error) {
          alert("User cancelled the Facebook login or did not fully authorize.");
        }
      });
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
    }
  });
  return loginView;
});