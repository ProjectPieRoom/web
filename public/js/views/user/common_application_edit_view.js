define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/user/common_application_edit_template.html',
  '../components/navbar_view',
  
  // CSS
  'css!/css/components/navbar/navbar.css',
  'css!/css/user/common_application_edit.css',
], function($, _, Backbone, Parse, CommonAppEditTemplate, NavBarView){
  var resumeView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( CommonAppEditTemplate ),

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