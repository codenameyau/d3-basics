/*-------JSHint Directives-------*/
/* jshint indent: 2              */
/* global crossroads             */
/* global hasher                 */
/* global d3                     */
/* global d3graphs               */
/* global d3shapes               */
/* global datagen                */
/*-------------------------------*/
'use strict';


/*********************
 * Graph Definitions *
 *********************/
var GRAPHS = {

  'horizontal-bargraph': {
    'description': 'HTML Randomized Horizontal Bargraph',
    call : function() {
      d3graphs.horizontalBargraph(datagen.uniformList(10, 10, 50));
    }
  },

  'vertical-bargraph': {
    'description': 'HTML Randomized Vertical Bargraph',
    call : function() {
      d3graphs.verticalBargraph(datagen.uniformList(15, 10, 50));
    }
  },

  'svg-shapes' : {
    'description': 'SVG Randomized Circles with Hover',
    call : function() {
      var data = datagen.uniformList(10, 35, 90);
      d3shapes.svgBasicShapes(data);
    }
  },

  'svg-bargraph-exam' : {
    'description': 'SVG Bargraph with CSV Exam Scores',
    call : function() {
      d3.csv('../data/finalexams.csv', function(error, data) {
        var label = {'x': 'name', 'y': 'score', 'yMax': 100, 'sort': 'desc'};
        d3graphs.svgBargraph(data, label);
      });
    }
  },

  'svg-bargraph-frequency' : {
    'description': 'SVG Bargraph with Frequency of Letters',
    call : function() {
      d3.csv('../data/letterfreq.csv', function(error, data) {
        var label = {'x': 'letter', 'y': 'frequency', 'sort': 'desc'};
        d3graphs.svgAxisBargraph(data, label);
      });
    }
  },

  'svg-piechart-frequency' : {
    'description': 'SVG Pie Chart with Frequency of Letters',
    call : function() {
      d3.csv('../data/letterfreq.csv', function(error, data) {
        var label = {'x': 'letter', 'y': 'frequency'};
        d3graphs.svgPieChart(data, label);
      });
    }
  },

  'scatter-plot-height-weight' : {
    'description': 'Scatter Plot of Women\'s Height vs Weight',
    call : function() {
      d3.csv('../data/women-height-weight.csv', function(error, data) {
        var label = {'x': 'height', 'y': 'weight'};
        d3graphs.scatterPlot(data, label);
      });
    }
  },

  'svg-voronoi' : {
    'description': 'Voronoi Geometry with Phyllotaxis Arrangement',
    call : function() {
      d3shapes.svgVoronoi();
    }
  },

};


/**********************
 * Internal Functions *
 **********************/
function clearChartBody() {
  d3.select('#chart-body').html('');
  d3.select('#chart-header').html('');
}

function parseHash(newHash) {
  crossroads.parse(newHash);
}


/**********************
 * App Routing Config *
 **********************/
// Route: Graphs
crossroads.addRoute('graph/{name}', function(name) {
  var graphTitle = GRAPHS[name].description;
  document.title = graphTitle;
  clearChartBody();
  d3.select('#chart-header').text(graphTitle);
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
