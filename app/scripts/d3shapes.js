/*-------JSHint Directives-------*/
/* jshint indent: 2              */
/* global d3                     */
/* exported d3shapes             */
/*-------------------------------*/
'use strict';


/********************
 * Exported Objects *
 ********************/

var d3shapes = {

  /* D3: Basic Shapes and Events */
  svgBasicShapes : function(data) {
    var width  = 700,
        height = 200;
    var figure = d3.select('.chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create circle
    figure.selectAll('g')
      .data(data).enter()
      .append('g')
        .attr('transform', function(d, i) {
          return 'translate(' + i*d + ',' + 50 + ')';
        })
      .append('circle')
        .style('stroke', '#8c8c8c')
        .style('fill', '#ffffff')
        .style('cursor', 'pointer')
        .attr('r', function(d) { return d; })
        .attr('cx', function(d, i) { return d*i+50; })
        .attr('cy', function(d) { return d; })
      .on('mouseover', function() {
        d3.select(this).style('fill', '#e5f8ff');
      })
      .on('mouseout', function() {
        d3.select(this).style('fill', '#ffffff');
      })
      .on('click', function(){
        d3.select(this)
        .transition()
          .duration(1000)
          .attr('r', 10)
        .transition()
          .delay(800)
          .attr('r', function(d) {return d; });
      });
  },

};
