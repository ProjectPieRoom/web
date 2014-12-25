define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'blurjs',
  'text!templates/company/single_company_template.html',
  '../components/navbar_view',
  './single_company_reviews',
  'css!/css/components/navbar/navbar.css',
  'css!/css/company/single_company.css',
], function($, _, Backbone, Parse, blurjs, SingleCompanyTemplate, NavBarView, SingleCompanyReviewsView){
  var singleCompanyView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( SingleCompanyTemplate ),

    initialize: function(options) {
      this.model = options.company;
      this.navbar = new NavBarView({el: '#navbarDiv'});
      this.company_reviews = new SingleCompanyReviewsView({companyName: this.model.get('CompanyName')});
    },

    render: function(){
      var data = {
        company: this.model.toJSON(),
      };
      this.template = this.template( data );
      this.$el.html( this.template );
      this.navbar.render();
      this.company_reviews.render();
      this.$('#overview_content').blurjs({
        source: '#overview_panel',
        overlay: 'rgba(0,0,0,0.0)',
        offset: {
          x: 100,
          y: 0
        }
      });
    }
  });
  return singleCompanyView;
});