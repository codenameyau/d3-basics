/*-------JSHint Directives-------*/
/* jshint indent: 2              */
/* global d3                     */
/* global datagen                */
/* exported d3shapes             */
/*-------------------------------*/
'use strict';


/********************
 * Exported Objects *
 ********************/

var d3shapes = {

  /* D3: Basic Shapes and Events */
  svgBasicShapes : function(data) {
    var margin = {top: 100, bottom:100, left: 100, right:100 };
    var width  = 900,
        height = 450;
    var strokeColor = '#8c8c8c',
        hoverColor  = '#e5f8ff';

    // Create SVG
    var figure = d3.select('.chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create circle
    var circles = figure.selectAll('g')
      .data(data).enter()
      .append('g')
        .attr('transform', function() {
          var randX = datagen.genRandomNum(margin.left, width-margin.right);
          var randY = datagen.genRandomNum(margin.top, height-margin.bottom);
          return 'translate(' + randX + ',' + randY + ')';
        });

    circles.append('circle')
        .style('stroke', strokeColor)
        .style('fill', '#ffffff')
        .style('cursor', 'pointer')
        .attr('r', function(d) { return d; })
      .on('mouseover', function() {
        d3.select(this)
          .style('fill', hoverColor)
          .transition()
            .duration(1000)
            .attr('r', 30)
          .transition()
            .delay(800)
            .attr('r', function(d) { return d; });
      })
      .on('mouseout', function() {
        d3.select(this)
          .style('fill', '#ffffff');
      });

    circles.append('text')
      .text(function(d) { return 'R' + d; })
      .style('stroke', strokeColor)
      .style('cursor', 'pointer')
      .attr('text-anchor', 'middle');

  },

};
