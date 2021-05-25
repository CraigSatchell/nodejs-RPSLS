"use strict";

const Player = require('./player')
const { promptGesture } = require('../helper');


class Human extends Player {
   constructor(name) {
      super(name);
      this.isHuman = true;

   }

   selectGesture(gestures) {
      // declare local variables
      let selGesture = -1
   
      while (selGesture < 0 || selGesture > gestures.length - 1) {
   
         console.log(`\n\t\t   *** ${this.name}: SELECT A GESTURE ***`);
         gestures.map(function (g, index) {
            return console.log('\t\t\t', index, ' - ', g);
         })
         selGesture = parseInt(promptGesture(`\tSelect One: `));
         if (isNaN(selGesture)) {
            selGesture = -1;
         } else {
            super.gesture = gestures[selGesture];
         }
      }
   }
}

module.exports = Human;