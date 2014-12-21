define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/company/index_template.html',
  'views/company/company',
  '../components/navbar_view',
  'css!/css/company/index.css',
  'css!/css/company/company.css',
], function($, _, Backbone, Parse, IndexTemplate, CompanyView, NavBarView){
  var CompanyIndexView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( IndexTemplate ),

    initialize: function(options) {
      this.collection = options.companies;
      this.collection.bind('add', this.addOne);
      this.navbar = new NavBarView({el: '#navbarDiv'});
    },

    addAll: function() {
      this.collection.forEach( this.addOne, this );
    },

    addOne: function(company) {
      var view = new CompanyView({
        model: company
      });
      this.$('#content_box').append( view.render().$el );
    },

    render: function(){
      this.$el.html( this.template );
      this.addAll();
      this.navbar.render();
      return this;
    }
  });
  return CompanyIndexView;
});