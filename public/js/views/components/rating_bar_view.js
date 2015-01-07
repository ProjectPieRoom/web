define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/components/rating_bar.html'
], function($, _, Backbone, Parse, RatingBarTemplate){
  var RatingBar = Parse.View.extend({
    template: _.template( RatingBarTemplate ),

    initialize: function(options) {
      this.el = options.el;
      this.value = options.value;
      return this;
    },

    render: function(){
      if (!this.value) this.value = parseFloat( $(this.el).text() );
      var width = this.value * 16; // (80/max rating) b/c 20% is used for numeric text
      var color = this.pickColor(this.value);
      var data = {
        color: color,
        width: width + "%",
        ticks: width / 16,
        value: this.value.toFixed(1),
      };
      this.template = this.template( data );
      $(this.el).html( this.template );
    },

    pickColor: function(value) {
      if( value < 1 ) return "#7b0100";
      else if ( value <= 1 ) return "#ea0001";
      else if ( value <= 2 ) return "#fa9927";
      else if ( value <= 3 ) return "#fec923";
      else if ( value <= 4 ) return "#92d14f";
      else if ( value <= 5 ) return "#00602b";
    }
  });
  return RatingBar;
});