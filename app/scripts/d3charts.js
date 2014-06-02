/*-------JSHint Directives-------*/
/* jshint indent: 2              */
/* global d3                     */
/* exported d3graphs             */
/*-------------------------------*/
'use strict';


/**********************
 * Internal Functions *
 **********************/
function getScale(data, maxPixelSize) {
  return d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, maxPixelSize]);
}


/********************
 * Exported Objects *
 ********************/
var d3graphs = {

  /* D3: Horizontal Bar Graph */
  horizontalBargraph : function(data) {
    var calcScale = getScale(data, 600);
    d3.select('.chart')
      .selectAll('div')
      .data(data)
      .enter().append('div')
      .style('width', function(d) {return calcScale(d) + 'px';})
      .style('background-color', '#4372c2')
      .style('color', '#fafafa')
      .style('margin', '5px 5px')
      .style('padding', '5px 10px')
      .style('text-align', 'right')
      .text(function(d) {return d;});
  },

  /* D3: Vertical Bar Graph */
  verticalBargraph : function(data) {
    var calcScale = getScale(data, 300);
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
      .style('height', function(d) {return calcScale(d) + 'px';})
      .text(function(d) {return d;});
  },

  /* D3: SVG Bar Graph */
  svgBargraph : function(data) {
    var width  = 500,
        height = 30;
    var scale = getScale(data, width);
    var chart = d3.select('.chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height * data.length);
    var bar = chart.selectAll('g').data(data)
      .enter().append('g')
      .attr('transform', function(d, i) {return 'translate(0,'+ (height+5)*i +')';});
    bar.append('rect')
      .attr('width', scale)
      .attr('height', height-1)
      .attr('fill', '#2c9e6c');
    bar.append('text')
      .attr('x', function(d) { return scale(d) - 8; })
      .attr('y', height / 2)
      .attr('dy', '.35em')
      .attr('fill', '#fafafa')
      .attr('text-anchor', 'end')
      .text(function(d) { return d; });

  },

};
