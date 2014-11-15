//TODO: move to views/company/company.js

define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/company.html'
], function($, _, Backbone, Parse, companyTemplate){
  var CompanyView = Backbone.View.extend({
    el: $('#app-view'),
    render: function(){
      // Using Underscore we can compile our template with data
      var data = {};
      var compiledTemplate = _.template( companyTemplate, data );
      // Append our compiled template to this Views "el"
      this.el.html( compiledTemplate );
    }
  });
  // Our module now returns our view
  return CompanyView;
});