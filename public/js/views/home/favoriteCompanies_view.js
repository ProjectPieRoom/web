define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'd3',
  'text!templates/home/favoriteCompanies_template.html',

  //CSS
  'css!/css/home/favoriteCompanies.css',
], function($, _, Backbone, Parse, d3, FavCoTemplate){
  var FavoriteCompaniesView = Parse.View.extend({
    template: _.template( FavCoTemplate ),

    initialize: function(options) {
      this.el = options.el;
    },

    render: function(){
      var data = {
        // Add data later
      };
      this.template = this.template( data );
      $(this.el).html( this.template );
      this.runScripts();
      return this;
    },

    runScripts: function(){
      this.favCoD3();
    },

    favCoD3: function(){
      /** D3 for the Favorite Companies Div
        * Description: River of company logos.
        */
      var elemWidth = 160,
        elemHeight = 66,
        spacing = 5;

      var container = $("#favoriteCompaniesDiv"),
          width = container.width(),
          height = 2*elemHeight + spacing;

      var svg = d3.select("#favoriteCompaniesDiv").append("svg")
          .attr("width", width)
          .attr("height", height);

      var elemGroup = svg.append("g")
          .attr("class", "logoGroup");

      // function(d,i) = function(data, index)

      var data = [];
      for (var i=1; i<=14; i++){
        data.push("img/company_logos/logo"+i+".png");
      }

      var images = elemGroup.selectAll("image")
          .data(data)
          .enter()
              .append("image")
              .attr("class", "logo")
              .attr("xlink:href", function(d){return d;})
              .attr("x", function(d,i){return elemWidth/2.0 + (elemWidth/2.0 + spacing)*i;})
              .attr("y", function(d,i){return (i%2==0) ? 0 : elemHeight + spacing;})
              .attr("width", elemWidth)
              .attr("height", elemHeight);

      d3.timer(function(){
        logos = d3.selectAll("#favoriteCompaniesDiv image");
        var dx = -1;
        logos.each(function(d,i){
          var prevTransform = $(this).attr("transform");
          if (prevTransform != null) { 
            prevTransform = prevTransform.match(/-?\d\.?\d*/g,'');
          }
          if (prevTransform == null) {
            prevTransform = 0;
          } else {
            prevTransform = parseFloat(prevTransform[0])  ;
          }
          var x = parseInt($(this).attr("x"));
          if (x + prevTransform < -elemWidth) {
            $(this).attr("transform", function(d){return "translate(" + (width - x) + ")";});
          } else {
            $(this).attr("transform", function(d){return "translate(" + (prevTransform + dx) + ")";});
          }
        });
      });
    }
  });
  // Our module now returns our view
  return FavoriteCompaniesView;
});
