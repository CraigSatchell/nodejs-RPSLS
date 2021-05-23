"use strict";

// player class
class Player {
   constructor(player) {
      this._name = player;
      this._wins = 0;
   }

   get name() {
      return this._name;
   }

   set name(newName) {
      this._name = newName;
   }

   get wins() {
      return this._wins;
   }

   set wins(newWins) {
      this._wins = newWins;
   }

   get gesture() {
      return this._gesture;
   }

   set gesture(newGesture) {
      this._gesture = newGesture;
      
   }
}

// define selectable game gestures
const gestureChoice = ['rock', 'paper', 'scissors', 'lizard', 'spock'];


// default exports
module.exports.Player = Player;
module.exports.gestureChoice = gestureChoice;