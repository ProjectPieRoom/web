define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/company/single_company_template.html',
  '../components/navbar_view',
  'css!/css/components/navbar/navbar.css',
  'css!/css/company/single_company.css',
], function($, _, Backbone, Parse, SingleCompanyTemplate, NavBarView){
  var singleCompanyView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( SingleCompanyTemplate ),

    initialize: function(options) {
      this.navbar = new NavBarView({el: '#navbarDiv'});
      this.model = options.company;
    },

    render: function(){
      var data = {
        company: this.model.toJSON(),
      };
      this.template = this.template( data );
      this.$el.html( this.template );
      this.navbar.render();
    }
  });
  return singleCompanyView;
});