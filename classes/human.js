"use strict";

const Player = require('./Player')
const { promptGesture } = require('../helper');


class Human extends Player {
   constructor(name) {
      super(name);
      this.isHuman = true;

   }

   selectGesture() {
      let selGesture = -1
      // get gesture input from player
      while (selGesture < 0 || selGesture > super.gestureChoices.length - 1) {
         console.log(`\n\t\t   *** ${this.name}: SELECT A GESTURE ***`);
         super.gestureChoices.map(function (g, index) {
            return console.log('\t\t\t', index, ' - ', g);
         })
         selGesture = parseInt(promptGesture(`\tSelect One: `));
         if (isNaN(selGesture)) {
            selGesture = -1;
         } else {
            super.gesture = super.gestureChoices[selGesture];
         }
      }
   }
}

module.exports = Human;