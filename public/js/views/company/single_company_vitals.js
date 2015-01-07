define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/company/single_company_vitals_template.html',
], function($, _, Backbone, Parse, SingleCompanyAboutTemplate){
  var singleCompanyVitalsView = Parse.View.extend({
    elem: '#company_vitals',
    template: _.template( SingleCompanyAboutTemplate ),

    initialize: function(options) {
    },

    render: function(data){
      this.template = this.template( data );
      $(this.elem).html( this.template );
    }
  });
  return singleCompanyVitalsView;
});