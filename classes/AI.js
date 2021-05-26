"use strict";

const { cenText } = require('../helper');
const Player = require('./Player');

class AI extends Player {
   constructor(name) {
      super(name);
      this.isHuman = false;
   }

   selectGesture() {
      let selGesture;
      // assign random gesture to AI player
      selGesture = Math.floor(Math.random() * this.gestureChoices.length);
      console.log('\n\t\t' + cenText('AI Player is thinking......',46));
      this.gesture = this.gestureChoices[selGesture];
   }
}

module.exports = AI;