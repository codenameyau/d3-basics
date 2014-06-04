/*-------JSHint Directives-------*/
/* jshint indent: 2              */
/* global d3                     */
/* exported datagen              */
/*-------------------------------*/
'use strict';


/********************
 * Exported Objects *
 ********************/
var datagen = {

  // genRandomNum(Int, Int) -> Int
  genRandomNum : function(min, max) {
    return Math.round(Math.random() * (max-min) + min);
  },

  // uniformList(Int, Int, Int) -> Array
  uniformList : function(size, min, max) {
    var dataset = [];
    for (var i = 0; i < size; i++) {
      dataset.push(this.genRandomNum(min, max));
    }
    return dataset;
  },

  // getColors(Int) -> Array
  getColors : function(size, baseColor) {
    baseColor = baseColor || '#E89A74';
    var rgbColor = d3.rgb(baseColor),
        hslColor = d3.hsl(rgbColor);
    var colors = [];
    for (var i = 0; i < size; i++) {
      var tempHue = Math.round((hslColor.h + (360 / size)*i) % 360);
      var newColor = d3.hsl(tempHue, hslColor.s, hslColor.l).toString();
      colors.push(newColor);
    }
    return colors;
  }

};
