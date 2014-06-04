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
  svgBasicShapes : function() {
    var width  = 400,
        height = 400;
    var figure = d3.select('.chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create circle
    figure.append('circle')
      .style('stroke', '#8c8c8c')
      .style('fill', '#ffffff')
      .attr('r', 50)
      .attr('cx', 60)
      .attr('cy', 60)
      .on('mouseover', function() {
        d3.select(this).style('fill', '#d5f8ff');
      })
      .on('mouseout', function() {
        d3.select(this).style('fill', '#ffffff');
      });
  },

};
