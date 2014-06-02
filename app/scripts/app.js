/*-------JSHint Directives-------*/
/* jshint indent: 2              */
/* global crossroads             */
/* global hasher                 */
/* global d3                     */
/* global d3graphs               */
/* global datagen                */
/*-------------------------------*/
'use strict';


/*********************
 * Graph Definitions *
 *********************/
var GRAPHS = {

  'horizontal-bargraph': {
    'description': 'HTML Horizontal Bargraph',
    call : function() {
      d3graphs.horizontalBargraph(datagen.uniformList(8, 10, 50));
    }
  },

  'vertical-bargraph': {
    'description': 'HTML Vertical Bargraph',
    call : function() {
      d3graphs.verticalBargraph(datagen.uniformList(5, 10, 50));
    }
  },

};


/**********************
 * Internal Functions *
 **********************/
function clearChartBody() {
  d3.select('#chart-body').html('');
}

function parseHash(newHash) {
  crossroads.parse(newHash);
}


/**********************
 * App Routing Config *
 **********************/

// Route: Graphs
crossroads.addRoute('graph/{name}', function(name) {
  document.title = GRAPHS[name].description;
  clearChartBody();
  GRAPHS[name].call();
});

// Route: Home
crossroads.addRoute('', function() {
  document.title = 'D3 Basics';
  clearChartBody();
  // Construct links
  for (var graph in GRAPHS) {
    d3.select('.chart')
      .append('div')
      .attr('class', 'chart-link')
      .append('a')
      .attr('href', '#/graph/' + graph)
      .text(GRAPHS[graph].description);
  }
});



/****************************
 * Initialize Browser State *
 ****************************/
hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
hasher.init(); //start listening for history change
