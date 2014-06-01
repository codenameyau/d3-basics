'use strict';

/****************************
 * Data Generator Functions *
 ****************************/

// Returns a list with random values
var datagen = {

  uniformList : function(size, min, max) {
    var dataset = [];
    for (var i = 0; i < size; i++) {
      var value = Math.floor(Math.random() * (max-min) + min);
      dataset.push(value);
    }
    return dataset;
  }


};

