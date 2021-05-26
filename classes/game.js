"use strict";

const { cenText, colorPrimaryHighlight, colorPrimary } = require("../helper");


class Game {
   static players = [];
   static roundsPlayed = 0;
   static gamesPlayed = 0;

   // add new player
   static addPlayer(player) {
      Game.players.push(player);
   }

   static showScoreBoard() {
      console.log('\n\n\t\t\t  ' + cenText(colorPrimaryHighlight('  SCOREBOARD  '),46));
      console.log('\n\t\t' + cenText('*** Total Games Won ***',46));
      console.log(`\n\t\t\t${this.players[0].name}: ${this.players[0].games}\t${this.players[1].name}: ${this.players[1].games}\n`)
   }
   static showGestureChoices() {
      console.log('\n\n\t\t\t  ' + cenText(colorPrimaryHighlight('  GESTURE CHOICES  '),46));
      console.log('\n\t\t\t' + colorPrimary(this.players[0].name + ': ') + this.players[0].gesture + '\t' + colorPrimary(this.players[1].name + ': ') + this.players[1].gesture + '\n');
   }


   // determine round winner
   static determineWinner(enemiesList) {
      // declare local variables
      let winner;
      let myEnemy;
      
      // search ememies list for matching gesture
      myEnemy = enemiesList.find(function (e) {
         return e.name === Game.players[0].gesture;
      });
      // search for enemy
      let enemy = myEnemy.enemies.find(function (e) {
         return e.name === Game.players[1].gesture;
      });
   
      // determine winner
      if (enemy !== undefined) {
         winner = Game.players[1]; // player two won the round
      } else {
         winner = Game.players[0]; // player one won the round
      }
      winner.updateWins();  // update winning player's score;
      return winner;    // return winning player's class object
   }
}

module.exports = Game;