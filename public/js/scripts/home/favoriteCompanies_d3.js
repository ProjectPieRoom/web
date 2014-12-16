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