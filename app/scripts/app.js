/*-------JSHint Directives-------*/
/* jshint indent: 2              */
/* global crossroads             */
/* global hasher                 */
/* global d3graphs               */
/* global datagen                */
/*-------------------------------*/
'use strict';

/*******************
 * Types of graphs *
 *******************/
var GRAPHS = {
  'horizontal' : d3graphs.horizontal,
};


/**********************
 * App Routing Config *
 **********************/
// Route: Graphs
crossroads.addRoute('graph/{name}', function(name) {
    var dataset = datagen.uniformList(8, 10, 50);
    d3graphs.horizontal(dataset);
  });

// Route: Home
crossroads.addRoute('', function() {
    for (var key in GRAPHS) {
      console.log(key);
    }
  });


// Setup hasher to parse hashes in url
function parseHash(newHash){
  crossroads.parse(newHash);
}

// Initialize and run hasher
hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
hasher.init(); //start listening for history change

