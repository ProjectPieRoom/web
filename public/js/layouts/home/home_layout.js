define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'layoutmanager',
  'text!templates/home/home_template.html',
  '/js/views/components/navbar_view.js'
], function($, _, Backbone, Parse, Layout, homeTemplate, NavBarView){
  var HomeLayout = Backbone.Layout.extend({
    // el: '#app-view',
    // el: "main",
    // el: $("#navbar"),
    // el: '#navbar',

    // initialize: function() {
    //   // this.navbar = new NavBarView();
    // },

    // render: function(){
    //   console.log("here");
    //   var data = {};
      // var compiledTemplate = ;
    //   $(this.el).html( compiledTemplate );
    // },
    template: function() {return homeTemplate},

    views: {
      'navbar' : new NavBarView()
    }
  });

  return HomeLayout;
});