/*-------JSHint Directives-------*/
/* jshint indent: 2              */
/* global d3                     */
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
      .data(data)
      .enter().append('div')
      .style('width', function(d) {return scale(d) + 'px';})
      .style('background-color', '#4372c2')
      .style('color', '#fafafa')
      .style('margin', '5px 5px')
      .style('padding', '5px 10px')
      .style('text-align', 'right')
      .text(function(d) {return d;});
  },

  /* D3: Vertical Bar Graph */
  verticalBargraph : function(data) {
    var scale = getScale(d3.max(data), 300);
    d3.select('.chart')
      .selectAll('div')
      .data(data)
      .enter().append('div')
      .style('display', 'inline-block')
      .style('vertical-align', 'bottom')
      .style('padding', '5px 10px')
      .style('background-color', 'teal')
      .style('margin', '5px 5px')
      .style('color', '#fafafa')
      .style('height', function(d) {return scale(d) + 'px';})
      .text(function(d) {return d;});
  },

  /* D3: SVG Bar Graph */
  svgBargraph : function(data, label) {
    // Parse args and label
    var sorted = label.sort || false;
    var width  = 600,
        height = 30;
    var xLabel = label.x,
        yLabel = label.y;

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
    var bar = chart.selectAll('g').data(data)
      .enter().append('g')
      .attr('transform', function(d, i) {
        return 'translate(0,'+ (height+2)*i +')';
      });
    bar.append('rect')
      .attr('width', function(d) {return scale(+d[yLabel]);})
      .attr('height', height-1)
      .attr('fill', '#2c9e6c');
    bar.append('text')
      .attr('x', 10)
      .attr('y', height / 2)
      .attr('dy', '.30em')
      .attr('fill', '#fafafa')
      .attr('text-anchor', 'start')
      .text(function(d) {return d[xLabel];});
    bar.append('text')
      .attr('x', function(d) {return scale(d[yLabel])-8;})
      .attr('y', height / 2)
      .attr('dy', '.30em')
      .attr('fill', '#fafafa')
      .attr('text-anchor', 'end')
      .text(function(d) {return parseInt(d[yLabel], 10);});
  },

  svgAxisBargraph : function(data, label) {
    var width  = 800,
        height = 500;

    // Ordinal for comparing values by rank, intervals
    var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1),
        y = d3.scale.linear().range([height, 0]);
    var chart = d3.select('.chart')
      .attr('width', width)
      .attr('height', height);
  },

};
