define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/home/home_template.html',
  '../components/navbar_view',
  './favoriteCompanies_view',
  'css!../../../css/components/navbar/navbar.css',
  'css!../../../css/home/home.css',
], function($, _, Backbone, Parse, homeTemplate, NavBarView, FavoriteCompaniesView){
  var HomeView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( homeTemplate ),

    initialize: function() {
      this.navbar = new NavBarView({el: '#navbarDiv'});
      this.favCoView = new FavoriteCompaniesView({el: '#favoriteCompaniesDiv'});
    },

    render: function() {
      var data = {};
      this.template = this.template( data );
      this.$el.html( this.template );
      this.navbar.render();
      this.favCoView.render();
    }
  });
  return HomeView;
});