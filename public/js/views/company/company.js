define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/company/company_template.html'
], function($, _, Backbone, Parse, companyTemplate){
  var CompanyView = Parse.View.extend({
    className: 'company_tile',
    template: _.template( companyTemplate ),

    render: function(){
      var data = {
        company: this.model.toJSON(),
        shortenedDescription: this.truncateDescription(this.model.get('Description'), 200)
      };
      this.template = this.template( data );
      this.$el.html( this.template );

      return this;
    },
    //short str to n chars
    truncateDescription: function(str, n) {
      return str.substr(0,n-1);
    }
  });
  return CompanyView;
});