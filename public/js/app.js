// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'parse'
], function($, _, Backbone, AppRouter, Parse){
  var initialize = function(){
    new AppRouter();

    Parse.history.start();
  }

  return {
    initialize: initialize
  };
});