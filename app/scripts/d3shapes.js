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
      .on('mouseenter', function() {
        d3.select(this)
          .style('fill', hoverColor)
          .transition()
            .duration(1000)
            .attr('r', 30)
          .transition()
            .delay(800)
            .attr('r', function(d) { return d; });
      })
      .on('mouseleave', function() {
        d3.select(this)
          .style('fill', '#ffffff');
      });

    circles.append('text')
      .text(function(d) { return 'R' + d; })
      .style('stroke', strokeColor)
      .style('cursor', 'pointer')
      .attr('text-anchor', 'middle');

  },

  svgVoronoi  : function() {
    var width   = 900,
        height  = 600,
        radius  = Math.sqrt(Math.pow(width, 2)/4 + Math.pow(height,2)/4);

    var numColors = 30,
        colors = datagen.getColors(numColors, '#eb5c4c', 360),
        randColor = colors[datagen.genRandomNum(0, numColors-1)];

    var spacing = 5,
        theta   = Math.PI * (3 - Math.sqrt(5)),
        total   = (radius * radius) / (spacing * spacing);

    var voronoi = d3.geom.voronoi()
        .clipExtent([[-1, -1], [width + 1, height + 1]]);

    var svg = d3.select('.chart')
      .append('svg')
        .attr('width', width)
        .attr('height', height);

    svg.selectAll('path')
      .data(voronoi(d3.range(total)
        .map(function(index) {
          var radius = spacing * Math.sqrt(index),
              angle  = index * theta;
          return [
            width / 2  + radius * Math.cos(angle),
            height / 2 + radius * Math.sin(angle)
          ];
        }))
        .filter(function(d) { return d.length; }))
      .enter().append('path')
        .attr('d', function(d) { return 'M' + d.join('L') + 'Z'; })
        .style('fill', '#fafafa')
        .style('stroke', '#5e5e5e')
        .on('mouseover', function() {
          d3.select(this).style('fill', randColor);
        });

  },

};
