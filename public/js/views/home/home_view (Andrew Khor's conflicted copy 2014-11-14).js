define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/home/home_template.html',
  '../components/navbar_view'
], function($, _, Backbone, Parse, homeTemplate, NavBarView){
  var HomeView = Backbone.View.extend({
    el: '#app-view',

    initialize: function() {
      this.navbar = new NavBarView({el: '#navbar'});
    },

    render: function(){
      var data = {};
      var compiledTemplate = _.template( homeTemplate, data );
      $(this.el).html( compiledTemplate );
      this.navbar.render();
    }
  });
  // Our module now returns our view
  return HomeView;
});