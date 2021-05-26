"use strict";

const prompt = require('prompt-sync')();
const chalk = require('chalk');

// local imports
const { promptFor, pressReturn, cenText, playGameBanner,
   appBanner, appTitle, colorPrimary, colorPrimaryHighlight, colorSecondary, colorInline } = require('./helper');

const { enemiesList } = require('./data.js');
const AI = require('./classes/AI');
const Human = require('./classes/Human');
const Game = require('./classes/Game');


// main application
function app() {
   // local variables

   playGame(enemiesList);
   console.log('\n\n\t\t' + cenText('Thanks for playing RPSLS! :)\n\n', 46));
}


// setup and play games
function playGame(enemiesLst) {
   // declare local variables
   let players = 0;
   let play1 = '';
   let play2 = '';
   let player1;
   let player2;
   let roundChoices = [3, 5, 7];
   let rounds;
   let roundWinner;
   let gameWinner;
   let input;

   while (players !== 1 && players !== 2) {
      playGameBanner();
      input = promptFor("1 or 2 players ('X' to Quit) ? ");
      if (input.toUpperCase() === 'X') {
         return
      }
      players = parseInt(input);
   }

   // get player names
   if (players === 2) {
      play1 = promptFor('Enter Name for Player 1: ');
      play2 = promptFor('Enter name for Player 2: ');
   } else {
      play1 = promptFor('Enter Name for Player 1: '); 0
      play2 = 'AI Player';
   }
   // initialize new player class instances
   if (players === 1) {
      player1 = new Human('Player 1');
      player2 = new AI('AI Player');
   } else {
      player1 = new Human('Player 1');
      player2 = new Human('Player 2');
   }
   // reassign names to player class instances, if required
   player1.name = play1 === '' ? player1.name : play1;
   player2.name = play2 === '' ? player2.name : play2;

   // add players to game static instance
   Game.addPlayer(player1);
   Game.addPlayer(player2);

   while (true) {
      // get rounds to play game
      while (!roundChoices.includes(rounds)) {
         playGameBanner();
         input = promptFor("How many rounds in a game? (3, 5 or 7) or 'X' to Quit ? ");
         if (input.toUpperCase() === 'X') {
            return
         }
         rounds = parseInt(input);
      }

      let count = 1;
      while (count <= rounds) {
         // get player gestures
         appBanner(appTitle);
         // select gestures
         player1.selectGesture();
         player2.selectGesture();

         // check if gestures are equal else check for winner
         if (player1.gesture === player2.gesture) {
            pressReturn('Both players chose the same gesture! Repeat...');
         } else {
            roundWinner = Game.determineWinner(enemiesLst);
            Game.roundsPlayed += 1; // update rounds played
            count++;

            Game.showGestureChoices();    // show gestures choices selected by each player
            console.log('\n\t\t' + cenText(roundWinner.name + ' won the round.',46));
            console.log(colorSecondary('\n\n\t\t\t' + colorPrimaryHighlight(' SCORE ') + ' ' + colorInline(player1.name + ': ' + colorPrimary(player1.wins) + '  ' + player2.name + ': ' + colorPrimary(player2.wins))));
            pressReturn();

            // check for game winner
            if ((player1.wins) > (rounds / 2)) {
               gameWinner = player1;
            } else if ((player2.wins) > (rounds / 2)) {
               gameWinner = player2;
            }
            if (gameWinner !== undefined && gameWinner !== null) {
               appBanner(appTitle);
               console.log('\n\n');
               pressReturn("Congratulations! " + colorPrimaryHighlight(` ${gameWinner.name} `) + ", you won the game.\n");
               Game.gamesPlayed += 1;  // update games played
               gameWinner.games += 1; // update player game stats
               Game.showScoreBoard();  // display game statistics
               count = rounds + 1;    // force loop exit
            }
         }
      }
      input = promptFor(colorPrimary("\tPlay another game ( Y/N ) ? ")).toUpperCase();
      if (input !== 'Y') {
         break;      // exit loop if answer is no
      }
      player1.resetRound();      // reset player 1 wins to 0
      player2.resetRound();      // reset player 2 wins to 0
      gameWinner = null;    // reset game winner
      rounds = 0;             // reset rounds
   }
}


// execute application
app();


