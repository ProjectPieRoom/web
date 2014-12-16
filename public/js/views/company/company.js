define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/company/company_template.html'
], function($, _, Backbone, Parse, companyTemplate){
  var CompanyView = Parse.View.extend({
    template: _.template( companyTemplate ),

    render: function(){
      var data = {
        company: this.model.toJSON(),
      };
      this.template = this.template( data );
      this.$el.html( this.template );

      return this;
    }
  });
  return CompanyView;
});