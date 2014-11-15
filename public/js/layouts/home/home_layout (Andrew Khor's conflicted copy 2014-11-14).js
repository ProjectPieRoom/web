define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'layoutmanager',
  'text!templates/home/home_template.html',
  '/js/views/components/navbar_view.js'
], function($, _, Backbone, Parse, Layout, homeTemplate, NavBarView){
  var HomeLayout = Backbone.Layout({
    // el: '#app-view',
    el: "#app-view",

    // initialize: function() {
    //   // this.navbar = new NavBarView();
    // },

    // render: function(){
    //   console.log("here");
    //   var data = {};
    //   var compiledTemplate = _.template( homeTemplate, data );
    //   $(this.el).html( compiledTemplate );
    // },

    template: _.template(homeTemplate, {}),

    views: {
      '#navbar' : new NavBarView()
    }
  });

  return HomeLayout;
});