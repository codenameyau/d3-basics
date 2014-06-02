/*-------JSHint Directives-------*/
/* jshint indent: 2              */
/* global crossroads             */
/* global hasher                 */
/* global d3                     */
/* global d3graphs               */
/* global datagen                */
/*-------------------------------*/
'use strict';

/*******************
 * Types of graphs *
 *******************/
var GRAPHS = {

  'horizontal' : {
    'description' : 'Simple Horizontal Bargraph',
    'function' : d3graphs.horizontal
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
  clearChartBody();
  var dataset = datagen.uniformList(8, 10, 50);
  d3graphs.horizontal(dataset);
});

// Route: Home
crossroads.addRoute('', function() {
  clearChartBody();
  // Construct links
  for (var graph in GRAPHS) {
    d3.select('.chart')
      .append('div')
      .append('a')
      .attr('href', '#/graph/' + graph)
      .text(GRAPHS[graph].description);
  }
});



// Initialize and run hasher
hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
hasher.init(); //start listening for history change
