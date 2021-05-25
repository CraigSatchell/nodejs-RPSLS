"use strict";


class Player {
   constructor(name) {
      this.name = name;
      this.wins = 0;
      this.games = 0;
      this.gesture = '';
      this.gestureChoices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
   }

   resetRound() {
      this.wins = 0;
      this.gesture = '';
   }

   updateWins() {
      this.wins += 1;
   }
   
}

module.exports = Player;