"use strict";

// game statistics class
class GameStats {
   constructor() {
      this.wins = 0;
      this.series = 0;
   }

   get wins() {
      return this._wins;
   }

   set wins(newWins) {
      this._wins = newWins;
   }

   get series() {
      return this._series;
   }

   set series(newSeries) {
      this._series = newSeries;
   }
}


class Player extends GameStats {
   constructor(name) {
      super()
      this._name = name;
   }

   get name() {
      return this._name;
   }

   set name(newName) {
      this._name = newName;
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


// enemies list
const enemiesList = [
   {
      name: 'rock',
      enemies: ['paper', 'spock'],
      messages: ['Paper covers Rock!', 'Spock vaporizes Rock!']
   },
   {
      name: 'scissors',
      enemies: ['spock', 'rock'],
      messages: ['Spock smashes Scissors!', 'Rock crushes Scissors!']
   },
   {
      name: 'paper',
      enemies: ['scissors', 'lizard'],
      messages: ['Scissors cuts Paper!', 'Lizard eats Paper!']
   },
   {
      name: 'lizard',
      enemies: ['rock', 'scissors'],
      messages: ['Rock crushes Lizard!', 'Scissors decapitates Lizard!']
   },
   {
      name: 'spock',
      enemies: ['lizard', 'paper'],
      messages: ['Lizard poisons Spock!', 'Paper disproves Spock!']
   }
]


// default exports
module.exports.Player = Player;
module.exports.gestureChoice = gestureChoice;
module.exports.enemiesList = enemiesList;