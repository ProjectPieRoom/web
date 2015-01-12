define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/user/common_application_template.html',
  '../components/navbar_view',
  
  // CSS
  'css!/css/components/navbar/navbar.css',
  'css!/css/user/common_application.css',
], function($, _, Backbone, Parse, CommonAppTemplate, NavBarView){
  var resumeView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( CommonAppTemplate ),

    initialize: function(options) {
      // this.model = options.company;
      this.navbar = new NavBarView({el: '#navbarDiv'});
    },

    render: function(){
      var data = {
      };
      this.template = this.template( data );
      this.$el.html( this.template );
      this.navbar.render();
    }
  });
  return resumeView;
});