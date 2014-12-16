define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'd3',
  'text!templates/home/favoriteCompanies_template.html'
], function($, _, Backbone, Parse, d3, favCoTemplate){
  var FavoriteCompaniesView = Parse.View.extend({
    template: _.template( favCoTemplate ),

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
      favCoD3();
    },

    favCoD3: function(){
      /** D3 for the Favorite Companies Div
        * Description: River of company logos.
        */

      var container = $("#favoriteCompaniesDiv"),
          width = container.width(),
          height = 500;

      var elemWidth = 50,
          elemHeight = 20,
          spacing = 5;

      var svg = d3.select("#favoriteCompaniesDiv").append("svg")
          .attr("width", width)
          .attr("height", height);

      var elemGroup = svg.append("g")
          .attr("class", "logoGroup");

      // function(d,i) = function(data, index)

      var data = [];
      for (var i=0; i<3; i++){
        data.push("img/logo.png")
      }

      var images = elemGroup.selectAll("image")
          .data(data)
          .enter()
              .append("image")
              .attr("class", "logo")
              .attr("xlink:href", function(d){return d;})
              .attr("x", function(d,i){return elemWidth + (elemWidth + spacing)*i;})
              .attr("y", elemHeight)
              .attr("width", elemWidth)
              .attr("height", elemHeight);
    }
  });
  // Our module now returns our view
  return FavoriteCompaniesView;
});