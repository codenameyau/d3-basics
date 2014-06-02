/*-------JSHint Directives-------*/
/* jshint indent: 2              */
/* exported datagen              */
/*-------------------------------*/
'use strict';


/********************
 * Exported Objects *
 ********************/
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
