"use strict";

const Player = require('./Player');

class AI extends Player {
   constructor(name) {
      super(name);
      this.isHuman = false;
   }

   selectGesture() {
      let selGesture;
      // assign random gesture to AI player
      selGesture = Math.floor(Math.random() * super.gestureChoices.length);
      console.log('\n\t\tAI Player is thinking......');
      super.gesture = super.gestureChoices[selGesture];
   }
}

module.exports = AI;