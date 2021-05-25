"use strict";


class Player {
   constructor(name) {
      this.name = name;
      this.wins = 0;
      this.games = 0;
      this.gesture = '';
   }
   resetRound() {
      this.wins = 0;
      this.gesture = '';
   }
   
}

module.exports = Player;