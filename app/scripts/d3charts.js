/*-------JSHint Directives-------*/
/* jshint indent: 2              */
/* global d3                     */
/* exported d3graphs             */
/*-------------------------------*/
'use strict';


/**********************
 * Internal Functions *
 **********************/
function getScale(maxValue, maxPixelSize) {
  return d3.scale.linear()
    .domain([0, maxValue])
    .range([0, maxPixelSize]);
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

  /*
   * D3: SVG Bar Graph
   * data  : List of Objects
   * label : {'xLabel', 'yLabel', 'yMax', 'sort'}
   * - sort can be either ['asc', 'desc']
   */
  svgBargraph : function(data, label) {
    var sorted = label.sort || false;

    // Parse label
    var width  = 600,
        height = 30;
    var xLabel = label.x,
        yLabel = label.y;

    // Sort values in data
    if (sorted) {
      if (sorted === 'asc') {
        data.sort(function(a, b) {
          return parseFloat(a[yLabel]) - parseFloat(b[yLabel]);
        });
      }
      else if (sorted === 'desc') {
        data.sort(function(a, b) {
          return parseFloat(b[yLabel]) - parseFloat(a[yLabel]);
        });
      }
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

};
