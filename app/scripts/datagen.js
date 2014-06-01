/* exported datagen */
'use strict';

/****************************
 * Data Generator Functions *
 ****************************/

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

