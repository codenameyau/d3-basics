'use strict';

/**********************
 * Crossroads Routing *
 **********************/

// Setup crossroads
crossroads.addRoute('graph/{name}', function(name) {
  console.log(name);
});

// Specify links in homepage
crossroads.addRoute('', function() {
  console.log('home');
  hasher.setHash('graph/1');
});


// Setup hasher
function parseHash(newHash, oldHash){
  crossroads.parse(newHash);
}

// Run hasher
hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
hasher.init(); //start listening for history change

