define([
  'underscore',
  'backbone',
  'parse'
], function(_, Backbone, Parse){
  var CompanyModel = Parse.Object.extend({
    className: "Company"
  });
  return CompanyModel;
});