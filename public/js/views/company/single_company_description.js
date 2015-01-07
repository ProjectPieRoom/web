define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/company/single_company_description_template.html',
], function($, _, Backbone, Parse, SingleCompanyDescriptionTemplate){
  var singleCompanyDescriptionView = Parse.View.extend({
    elem: '#company_description_pane',
    template: _.template( SingleCompanyDescriptionTemplate ),

    initialize: function(options) {
    },

    render: function(data) {
      var product_desc = data.angellistData.product_desc;
      product_desc = product_desc.replace(/\n/g, "<br />");
      this.template = this.template( {description: product_desc} );
      $(this.elem).html( this.template );
    }
  });
  return singleCompanyDescriptionView;
});