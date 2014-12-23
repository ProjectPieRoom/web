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

    events: {
      'click #sign_up_btn': 'redirectWithEmail'
    },

    initialize: function() {
    },

    redirectWithEmail: function(e) {
      var email = this.$('#email_input').val();
      this.$('#sign_up_btn').attr('href', '/#/join/' + email);
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