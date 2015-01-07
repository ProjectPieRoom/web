define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'blurjs',
  'text!templates/company/single_company_template.html',
  './single_company_reviews',
  './single_company_vitals',
  './single_company_description',
  'css!/css/components/navbar/navbar.css',
  'css!/css/company/single_company.css',
], function($, _, Backbone, Parse, blurjs,
            SingleCompanyTemplate, SingleCompanyReviewsView, SingleCompanyVitalsView, SingleCompanyDescriptionView){
  var singleCompanyView = Parse.View.extend({
    el: $('#app-view'),
    template: _.template( SingleCompanyTemplate ),

    initialize: function(options) {
      this.model = options.company;
      this.company_reviews = new SingleCompanyReviewsView({companyName: this.model.get('CompanyName')});
      this.company_vitals = new SingleCompanyVitalsView();
      this.company_description = new SingleCompanyDescriptionView();
    },

    render: function(){
      var data = {
        company: this.model.toJSON(),
      };
      this.template = this.template( data );
      this.$el.html( this.template );
      this.$('#overview_content').blurjs({
        source: '#overview_panel',
        overlay: 'rgba(0,0,0,0.0)',
        offset: {
          x: 100,
          y: 0
        }
      });
      //Glassdoor
      this.company_reviews.render();
      //AngelList
      var url = "https://api.angel.co/1/startups/" + this.model.get('AngelListID');
      var that = this;
      $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function( response ) {
          var data = {
            angellistData: response
          };
          that.company_vitals.render(data);
          that.company_description.render(data);
        }
      });
    }
  });
  return singleCompanyView;
});