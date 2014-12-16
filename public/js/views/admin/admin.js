define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/admin/admin_template.html'
], function($, _, Backbone, Parse, adminTemplate){
  var AdminView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( adminTemplate ),

    initialize: function(options) {
      this.companies = options.companies;
      that = this;
      Parse.User.logIn("andrew", " ", {
        success: function(user) {
          console.log(user);
          console.log(that.companies);
        },
        error: function(user, error) {
          // The login failed. Check error to see why.
        }
      });
    },

    render: function(){
      var data = {
        companies: this.companies
      };
      this.template = this.template( data );
      this.$el.html( this.template );


    }
  });
  return AdminView;
});