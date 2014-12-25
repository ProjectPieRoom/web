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

    render: function(){
      var url = "http://api.glassdoor.com/api/api.htm?t.p=28230&t.k=eawjFOeuPuY&userip=0.0.0.0&useragent=" + navigator.userAgent + "&format=json&v=1&action=employers" + "&q=" + this.companyName;
      that = this;
      $.ajax({
        url: url,
        dataType: "jsonp",
        success: function( response ) {
          var data = {
          };
          if (response && response.success && response.response.employers.length == 1) data['glassdoorData'] = response.response.employers[0];
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