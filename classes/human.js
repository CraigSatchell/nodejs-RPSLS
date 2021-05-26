"use strict";

const Player = require('./Player')
const { promptGesture, cenText } = require('../helper');


class Human extends Player {
   constructor(name) {
      super(name);
      this.isHuman = true;

   }

   selectGesture() {
      let selGesture = -1
      // get gesture input from player
      while (selGesture < 0 || selGesture > this.gestureChoices.length - 1) {
         console.log('\n\n\t\t' + cenText(`*** ${this.name}: SELECT A GESTURE ***`,46));
         this.gestureChoices.map(function (g, index) {
            return console.log('\t\t\t\t', index, ' - ', g);
         })
         selGesture = parseInt(promptGesture(`\tSelect One: `));
         if (isNaN(selGesture)) {
            selGesture = -1;
         } else {
            this.gesture = this.gestureChoices[selGesture];
         }
      }
   }
}

module.exports = Human;