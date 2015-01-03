define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'blurjs',
  'text!templates/user/profile_template.html',
  '../components/navbar_view',
  'css!/css/components/navbar/navbar.css',
  'css!/css/user/profile.css',
], function($, _, Backbone, Parse, blurjs, ProfileTemplate, NavBarView){
  var profileView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( ProfileTemplate ),

    initialize: function(options) {
      // this.model = options.company;
      this.navbar = new NavBarView({el: '#navbarDiv'});
    },

    render: function(){
      var data = {
        // company: this.model.toJSON(),
      };
      this.template = this.template( data );
      this.$el.html( this.template );
      this.navbar.render();
      // this.$('#overview_content').blurjs({
      //   source: '#overview_panel',
      //   overlay: 'rgba(0,0,0,0.0)',
      //   offset: {
      //     x: 100,
      //     y: 0
      //   }
      // });
    }
  });
  return profileView;
});