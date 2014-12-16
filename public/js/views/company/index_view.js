define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/company/index_template.html',
  'views/company/company'
], function($, _, Backbone, Parse, IndexTemplate, CompanyView){
  var CompanyIndexView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( IndexTemplate ),

    initialize: function(options) {
      this.listenTo(this.collection, 'add', this.addOne );
    },

    addAll: function() {
      this.collection.forEach( this.addOne, this );
    },

    addOne: function(company) {
      var view = new CompanyView({
        model: company
      });
      this.$el.append( view.render().$el );
    },

    render: function(){
      this.$el.html( this.template );
      this.addAll();
      return this;
    }
  });
  return CompanyIndexView;
});