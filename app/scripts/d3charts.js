/*-------JSHint Directives-------*/
/* jshint indent: 2              */
/* global d3                     */
/* exported d3graphs             */
/*-------------------------------*/
'use strict';


var d3graphs = {

  /* D3: Horizontal Bar Graph */
  horizontalBargraph : function(data) {
    var calcWidth = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 500]);

    d3.select('.chart')
      .selectAll('div')
      .data(data)
      .enter().append('div')
      .style('width', function(d) {return calcWidth(d) + 'px';})
      .style('background-color', '#4372c2')
      .style('color', '#ececec')
      .style('margin', '5px 0px')
      .style('padding', '5px 10px')
      .style('text-align', 'right')
      .text(function(d) {return d;});
  },

};
