define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/admin/admin_template.html',
  '../admin/admin_company_view'
], function($, _, Backbone, Parse, AdminTemplate, CompanyView){
  var AdminView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( AdminTemplate ),

    initialize: function(options) {
      this.companies = options.companies;
      that = this;
      Parse.User.logIn("andrew", " ", {
        success: function(user) {
          console.log("User authenticated");
        },
        error: function(user, error) {
          // The login failed. Check error to see why.
        }
      });
    },

    render: function(){
      var data = {
        
      };
      this.template = this.template( data );
      this.$el.html( this.template );
      this.companies.each(function(company) {
        var companyView = new CompanyView({
          model: company,
          el: "#company-container"
        })
        companyView.render();
      });

    }
  });
  return AdminView;
});