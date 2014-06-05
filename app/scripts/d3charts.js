/*-------JSHint Directives-------*/
/* jshint indent: 2              */
/* global d3                     */
/* global datagen                */
/* exported d3graphs             */
/*-------------------------------*/
'use strict';


/**********************
 * Internal Functions *
 **********************/
// Internal: getScale(Int, Int) -> Function
function getScale(maxValue, maxPixelSize) {
  return d3.scale.linear()
    .domain([0, maxValue])
    .range([0, maxPixelSize]);
}

// Internal: sortData(List, String, String) -> List
function sortData(data, comp, order) {
  if (order === 'asc') {
    return data.sort(function(a, b) {
      return parseFloat(a[comp]) - parseFloat(b[comp]);
    });
  }
  else if (order === 'desc') {
    return data.sort(function(a, b) {
      return parseFloat(b[comp]) - parseFloat(a[comp]);
    });
  }
}

/********************
 * Exported Objects *
 ********************/
var d3graphs = {

  /* D3: Horizontal Bar Graph */
  horizontalBargraph : function(data) {
    var scale = getScale(d3.max(data), 600);
    d3.select('.chart')
      .selectAll('div')
      .data(data).enter()
      .append('div')
        .style('width', function(d) { return scale(d) + 'px'; })
        .style('background-color', '#4372c2')
        .style('color', '#fafafa')
        .style('margin', '5px 5px')
        .style('padding', '5px 10px')
        .style('text-align', 'right')
        .text(function(d) { return d; });
  },

  /* D3: Vertical Bar Graph */
  verticalBargraph : function(data) {
    var scale = getScale(d3.max(data), 400);
    d3.select('.chart')
      .selectAll('div')
      .data(data).enter()
      .append('div')
        .style('display', 'inline-block')
        .style('vertical-align', 'bottom')
        .style('padding', '5px 10px')
        .style('background-color', 'teal')
        .style('margin', '5px 5px')
        .style('color', '#fafafa')
        .style('height', function(d) { return scale(d) + 'px'; })
        .text(function(d) { return d; });
  },

  /* D3: SVG Bar Graph */
  svgBargraph : function(data, label) {
    // Parse args and label
    var sorted = label.sort || false;
    var width  = 800,
        height = 30;
    var xLabel = label.x,
        yLabel = label.y;
    var barColor   = '#2c9e6c',
        hoverColor = '#a14f41';

    // Sort data
    if (sorted) {
      sortData(data, yLabel, sorted);
    }

    // Settings for scale and chart size
    var scale = getScale(label.yMax, width);
    var chart = d3.select('.chart')
      .append('svg')
        .attr('width', width)
        .attr('height', height * data.length + height*2);

    // Create SVG rectangles for each data point
    var bar = chart.selectAll('g')
      .data(data).enter()
      .append('g')
        .attr('transform', function(d, i) {
          return 'translate(0,'+ (height+2)*i +')';
        });
    bar.append('rect')
        .attr('width', function(d) { return scale(+d[yLabel]); })
        .attr('height', height-1)
        .attr('fill', barColor)
        .on('mouseover', function() {
          d3.select(this)
            .style('fill', hoverColor);
        })
        .on('mouseout', function() {
          d3.select(this)
            .style('fill', barColor);
        });
    bar.append('text')
        .attr('x', 10)
        .attr('y', height / 2)
        .attr('dy', '.30em')
        .attr('fill', '#fafafa')
        .attr('text-anchor', 'start')
        .text(function(d) { return d[xLabel]; });
    bar.append('text')
        .attr('x', function(d) { return scale(d[yLabel])-8; })
        .attr('y', height / 2)
        .attr('dy', '.30em')
        .attr('fill', '#fafafa')
        .attr('text-anchor', 'end')
        .text(function(d) { return parseInt(d[yLabel], 10); });
  },

  svgAxisBargraph : function(data, label) {
    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width  = 900 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    var xLabel = label.x,
        yLabel = label.y,
        sorted = label.sort;

    // Sort data
    if (sorted) {
      sortData(data, yLabel, sorted);
    }

    // Ordinal for comparing values by rank, intervals
    var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.15),
        y = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left')
        .ticks(10, '%');
    var chart = d3.select('.chart')
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Get the x values through iteration (i.e. letters)
    x.domain(data.map(function(d) { return d[xLabel]; }));
    y.domain([0, d3.max(data, function(d) { return d[yLabel]; })]);

    // Add x-axis
    chart.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(xAxis)
      .append('text')
        .attr('x', width / 2)
        .attr('y', margin.bottom)
        .style('font', '12px san-serif')
        .style('fill', '#282828')
        .text(xLabel)
        .style('text-transform', 'capitalize');

    // Add y-axis
    chart.append('g')
      .attr('class', 'axis')
      .call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height/2)
        .attr('y', -margin.left+10)
        .style('font', '12px san-serif')
        .style('fill', '#282828')
        .text(yLabel)
        .style('text-transform', 'capitalize');

    // Create bar chart
    chart.selectAll('.bar')
      .data(data).enter()
      .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return x(d[xLabel]); })
        .attr('y', function(d) { return y(d[yLabel]); })
        .attr('fill', '#4372c2')
        .attr('height', function(d) { return height-y(d[yLabel]); })
        .attr('width', x.rangeBand());
  },

  svgPieChart : function(data, label) {
    var margin = {top: 20, bottom: 20, left: 200, right: 300};
    var xLabel = label.x,
        yLabel = label.y,
        width  = 900,
        height = 500;

    // Compute pie color and radius
    var basePieColor = '#E89A74',
        hoverColor   = '#32A9E3';
    var radius = Math.min(width, height) / 2;
    var colors = d3.scale.ordinal()
      .range(datagen.getColors(data.length, basePieColor));

    // Sort data desc
    sortData(data, yLabel, 'desc');

    // Define arc and pie
    var arc = d3.svg.arc()
      .outerRadius(radius-20)
      .innerRadius(0);
    var pie = d3.layout.pie()
      .value(function(d) { return d[yLabel]; });

    // Create chart
    var figure = d3.select('.chart')
      .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Add each piece of pie chart
    var piece = figure.append('g')
      .attr('transform', 'translate(' + (width-margin.right)/2 + ',' + height/2 + ')')
      .selectAll('g')
      .data(pie(data)).enter()
      .append('g')
        .style('stroke', '#ffffff');
    piece.append('path')
      .attr('d', arc)
      .style('fill', function(d) { return colors(d.data[xLabel]); })
      .on('mouseover', function(d) {
        d3.select(this).style('fill', hoverColor);
        d3.select('.legendColor')
          .style('fill', colors(d.data[xLabel]));
        d3.select('.legendText')
          .text('hello');
      })
      .on('mouseout', function(d) {
        d3.select(this).style('fill', colors(d.data[xLabel]));
      });

    // Create legend
    var legWidth  = 150,
        legHeight = 50;
    var legend = figure.append('g');
    legend.append('rect')
        .attr('class', 'legendColor')
        .attr('width', legWidth)
        .attr('height', legHeight)
        .style('fill', '#fafafa')
        .style('stroke', '#3c3c3c')
        .style('opacity', 0.8)
        .attr('transform', 'translate(' + margin.right + ',' + (-legHeight/2) + ')');
    legend.append('text')
      .attr('class', 'legendText')
      .style('fill', '#5c5c5c')
      .attr('text-anchor', 'start');

  },

};
