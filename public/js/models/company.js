// Filename: models/company
define([
  'underscore',
  'backbone',
  'parse'
], function(_, Backbone, Parse){
  var CompanyModel = Parse.Object.extend({
    defaults: {
      name: "FindX"
    }
  });
  // Return the model for the module
  return CompanyModel;
});