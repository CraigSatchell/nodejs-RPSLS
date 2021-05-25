"use strict";


class Game {
   static players = [];
   static roundsPlayed = 0;
   static gamesPlayed = 0;

   static addPlayer(player) {
      Game.players.push(player);
   }
}

module.exports = Game;