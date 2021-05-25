"use strict";

const Player = require('./player');

class AI extends Player {
   constructor(name) {
      super(name);
      this.isHuman = false;
   }

   selectGesture(gestures) {
      let selGesture;
      // assign random gesture to AI player
      selGesture = Math.floor(Math.random() * gestures.length);
      console.log('\n\t\tAI Player is thinking......');
      super.gesture = gestures[selGesture];
   }
}

module.exports = AI;