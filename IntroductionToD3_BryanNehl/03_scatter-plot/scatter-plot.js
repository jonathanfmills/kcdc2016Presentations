// simulated scatter plot
// useful information here: http://www.d3noob.org/2013/01/adding-grid-lines-to-d3js-graph.html

var plotDimension = 300;
var padding = 100;
var halfPadding = padding / 2;

var graphData = [
    {"x": 2, "y": 2},
    {"x": 5, "y": 5},
    {"x": 10, "y": 10},
    {"x": 15, "y": 15},
    {"x": 20, "y": 20},
    {"x": 22.5, "y": 27.5},
    {"x": 25, "y": 35},
    {"x": 32, "y": 42},
    {"x": 35, "y": 45},
    {"x": 50, "y": 50}
];

var svg = d3.select("body")
    .append("svg")
    .attr("width",  plotDimension + padding)
    .attr("height", plotDimension + padding);

var xScale = d3.scale.linear().range([0, plotDimension]);
var yScale = d3.scale.linear().range([plotDimension, 0]);
var colorScale = d3.scale.category10();   // setting up a color scale

function render(data){
    // nice() does some magic to get things to start at 0!
    xScale.domain(d3.extent(data, function (d){ return d.x; })).nice();
    yScale.domain(d3.extent(data, function (d){ return d.y; })).nice();

    var circles = svg.selectAll("circle").data(data);
    circles.enter()
        .append("circle")
        .attr("r", 3)               // color based on data bucketed in scale
        .attr("stroke", function (d){ return colorScale(d.y); })
        .attr("fill","none")
        .attr("cx", function (d){ return xScale(d.x) + halfPadding; })
        .attr("cy", function (d){ return yScale(d.y) + halfPadding; });

    // circles.exit()  // bound data has been removed, remove the DOM element!
    //     .remove();
}

function make_y_axis() {
    return d3.svg.axis()
          .scale(yScale)
          .orient("left")
          .ticks(10);
}

function make_x_axis() {
    return d3.svg.axis()
          .scale(xScale)
          .orient("bottom")
          .ticks(10);
}

function renderAxis() {
  // x axis
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + halfPadding + "," + (plotDimension + halfPadding) + ")")
    .call(make_x_axis());

  // y axis
  svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + halfPadding + "," + halfPadding + ")")
        .call(make_y_axis());
}

function renderGrid() {
  // horizontal grid lines
  svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(" + halfPadding + "," + halfPadding + ")")
    .call(make_y_axis()
          .tickSize(-plotDimension, 0, 0)
          .tickFormat("")
         );

  // vertical grid lines
  svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(" + halfPadding + "," + (plotDimension + halfPadding) + ")")
    .call(make_x_axis()
          .tickSize(-plotDimension, 0, 0)
          .tickFormat("")
         );
}

render(graphData);
renderAxis();
renderGrid();
