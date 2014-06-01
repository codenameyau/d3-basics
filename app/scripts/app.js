/* global crossroads: true */
/* global hasher: true */
'use strict';

/**********************
 * App Routing Config *
 **********************/

// Route: Graphs
crossroads.addRoute('graph/{name}', function(name) {
    console.log(name);
});

// Route: Home
crossroads.addRoute('', function() {
    console.log('home');
    hasher.setHash('graph/1');
});


// Setup hasher to parse hashes in url
function parseHash(newHash){
    crossroads.parse(newHash);
}

// Initialize and run hasher
hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
hasher.init(); //start listening for history change

