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

};
