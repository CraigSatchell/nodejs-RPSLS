"use strict";

// gesture class
class Gesture {
   constructor(name, enemies) {
      this.name = name;
      this.enemies = enemies;
   }
}

// player class
class Player {
   constructor(player) {
      this._name = player;
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
}

// define selectable game gestures
const gestureChoice = ['rock', 'paper', 'scissors', 'lizard', 'spock'];


// default exports
module.exports.Gesture = Gesture;
module.exports.Player = Player;
module.exports.gestureChoice = gestureChoice;