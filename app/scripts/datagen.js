/*-------JSHint Directives-------*/
/* jshint indent: 2              */
/* exported datagen              */
/*-------------------------------*/
'use strict';


/********************
 * Exported Objects *
 ********************/
var datagen = {

  genRandomNum : function(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
  },

  uniformList : function(size, min, max) {
    var dataset = [];
    for (var i = 0; i < size; i++) {
      dataset.push(this.genRandomNum(min, max));
    }
    return dataset;
  },

  getColors : function(size) {
    var colors = [];
    for (var i = 0; i < size; i++) {
      colors.push('#d3432c');
    }
    return colors;
  }

};
