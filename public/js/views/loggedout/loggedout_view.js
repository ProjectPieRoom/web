define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'domReady!',
  'parallax',
  'text!templates/loggedout/loggedout_template.html'
], function($, _, Backbone, Parse, doc, Parallax, loggedOutTemplate){
  var HomeView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( loggedOutTemplate ),

    initialize: function() {
    },

    render: function(){
      var data = {};
      this.template = this.template( data );
      this.$el.html( this.template );
      $.stellar();
    }
  });
  return HomeView;
});