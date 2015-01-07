define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/company/single_company_reviews_template.html',
  '../components/rating_bar_view',
], function($, _, Backbone, Parse, SingleCompanyReviewsTemplate, RatingBarView){
  var singleCompanyReviewsView = Parse.View.extend({
    elem: '#company_reviews',
    template: _.template( SingleCompanyReviewsTemplate ),

    initialize: function(options) {
      this.companyName = options.companyName;
    },

    extractCompanyInfo: function(response) {
      var isValid = false;
      //Checks
      if( response && response.success && response.status == "OK" && response.response.employers && response.response.employers.length > 0 ) isValid = true;
      if( !isValid ) return null;
      //Extraction
      for(var i = 0; i < response.response.employers.length; i++) {
        company = response.response.employers[i];
        if( company.exactMatch ) return company;
      }
      return null;
    },

    render: function(){
      var url = "http://api.glassdoor.com/api/api.htm?t.p=28230&t.k=eawjFOeuPuY&userip=0.0.0.0&useragent=" + navigator.userAgent + "&format=json&v=1&action=employers" + "&q=" + this.companyName;
      var that = this;
      $.ajax({
        url: url,
        dataType: "jsonp",
        success: function( response ) {
          var data = {
          };
          var GDCompanyInfo = that.extractCompanyInfo(response);
          if( GDCompanyInfo ) data['glassdoorData'] = GDCompanyInfo;
          else return;
          that.template = that.template( data );
          $(that.elem).html( that.template );
          $(".review_row").each(function(index) {
            $( this ).attr("id", "review_row-" + index);
            new RatingBarView({
              el: "#review_row-" + index + " .value",
            }).render();
          });
        }
      });
    }
  });
  return singleCompanyReviewsView;
});