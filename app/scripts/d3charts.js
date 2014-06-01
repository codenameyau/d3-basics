'use strict';

var bargraphs = {

  /* D3: Horizontal Bar Graph */
  horizontal : function(data) {
    d3.select('#chart-body')
      .selectAll('div')
      .data(data)
      .enter().append('div')
      .style('width', function(d) {return d * 10 + 'px';})
      .style('background-color', '#4372c2')
      .style('color', '#ececec')
      .style('margin', '5px 0px')
      .style('padding', '5px 10px')
      .style('text-align', 'right')
      .text(function(d) {return d;});
    }

};

