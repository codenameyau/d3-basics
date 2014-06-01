'use strict';

/****************************
 * Data Generator Functions *
 ****************************/

// Returns a list with random values
function genUniformDataList(size, min, max) {
    var dataset = [];
    for (var i = 0; i < size; i++) {
        var genValue = Math.floor(Math.random() * (max - min) + min);
        dataset.push(genValue);
    }
    return dataset;
}

