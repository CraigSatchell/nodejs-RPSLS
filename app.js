"use strict";

const prompt = require('prompt-sync')();
const chalk = require('chalk');

// local imports
const { enemiesList, gestureChoice } = require('./data.js');
const AI = require('./classes/AI');
const Human = require('./classes/human');

const appTitle = 'ROCK PAPER SCISSORS LIZARD SPOCK (RPSLS)';

// ui color definitions
const colorBanner = chalk.black.bgYellow;
const colorPrimary = chalk.yellow;
const colorPrimaryHighlight = chalk.black.bgYellow;
const colorSecondary = chalk.green;
const colorSecondaryHighlight = chalk.black.bgGreen;
const colorInline = chalk.white;


// main application
function app() {
   // local variables

   playGame(gestureChoice, enemiesList);
   console.log('\n\n\t\t' + cenText('Thanks for playing RPSLS! :)\n\n', 46));
}


// setup and play games
function playGame(gestures, enemiesLst) {
   // declare local variables
   let players = 0;
   let play1 = '';
   let play2 = '';
   let player1;
   let player2;
   let roundChoices = [3, 5, 7];
   let rounds;
   let roundWinner;
   let seriesWinner;
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
   // initialize player class instances
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

   while (true) {
      // get rounds to play game
      while (!roundChoices.includes(rounds)) {
         playGameBanner();
         input = promptFor("How many rounds in series? (3, 5 or 7) or 'X' to Quit ? ");
         if (input.toUpperCase() === 'X') {
            return
         }
         rounds = parseInt(input);
      }

      let count = 1;
      while (count <= rounds) {
         // get player gestures
         appBanner(appTitle);
         console.log(colorPrimary('\n\t\t' + cenText('ROUND ' + count, 46)));
         if (players === 2) {
            selectGestureHuman(player1, gestures);
            selectGestureHuman(player2, gestures);
         } else {    // if AI Player exist
            selectGestureHuman(player1, gestures);
            selectGestureAI(player2, gestures);
         }

         // check if gestures are equal else check for winner
         if (player1.gesture === player2.gesture) {
            pressReturn('Both players chose the same gesture! Repeat...');
         } else {
            roundWinner = determineWinner(player1, player2, enemiesLst);
            count++;
            console.log(colorPrimary(`\n\t\t${roundWinner.name} won the round.`));
            console.log(colorSecondary('\n\t\t' + colorPrimaryHighlight(' SCORE ') + ' ' + colorInline(player1.name + ': ' + colorPrimary(player1.wins) + '  ' + player2.name + ': ' + colorPrimary(player2.wins))));
            pressReturn();

            // check for series winner
            if ((player1.wins) > (rounds / 2)) {
               seriesWinner = player1;
            } else if ((player2.wins) > (rounds / 2)) {
               seriesWinner = player2;
            }
            if (seriesWinner !== undefined && seriesWinner !== null) {
               appBanner(appTitle);
               console.log('\n\n');
               pressReturn("Congratulations! " + colorPrimaryHighlight(` ${seriesWinner.name} `) + ", you won the series.\n");
               seriesWinner.series += 1; // update player game stats
               count = rounds + 1;    // force loop exit
            }
         }
      }
      input = promptFor(colorPrimary("Play another series ( Y/N ) ? ")).toUpperCase();
      if (input !== 'Y') {
         break;      // exit loop if answer is no
      }
      player1.resetRound();      // reset player 1 wins to 0
      player2.resetRound();      // reset player 2 wins to 0
      seriesWinner = null;    // reset game winner
      rounds = 0;             // reset rounds
   }
}


// select human gesture
function selectGestureHuman(player, gestures) {
   // declare local variables
   let selGesture = -1

   while (selGesture < 0 || selGesture > gestures.length - 1) {

      console.log(`\n\t\t   *** ${player.name}: SELECT A GESTURE ***`);
      gestures.map(function (g, index) {
         return console.log('\t\t\t', index, ' - ', g);
      })
      selGesture = parseInt(promptGesture(`\tSelect One: `));
      if (isNaN(selGesture)) {
         selGesture = -1;
      } else {
         player.gesture = gestures[selGesture];
      }
   }
}


// select AI gesture
function selectGestureAI(player, gestures) {
   // declare local variables
   let selGesture;
   // assign random gesture to AI player
   selGesture = Math.floor(Math.random() * gestures.length);
   console.log('\n\t\tAI Player is thinking......');
   player.gesture = gestures[selGesture];
}


// update player wins
function updatePlayerWins(player) {
   player.wins += 1;
}


// determine round winner 
function determineWinner(player1, player2, enemiesList) {
   // declare local variables
   let winner;
   let myEnemy;


   // search ememies list for matching gesture
   myEnemy = enemiesList.find(function (e) {
      return e.name === player1.gesture;
   });
   // search for en
   let enemy = myEnemy.enemies.find(function (e) {
      return e.name === player2.gesture;
   });
   console.log('E100: ', myEnemy);
   //console.log('E101: ', enemy.name, player2.gesture, enemy === player2.gesture);
   console.log('E102: Player 1:', player1.gesture, '  Player 2:', player2.gesture);

   // determine winner
   if (enemy !== undefined) {
      winner = player2; // player two won the round
   } else {
      winner = player1; // player one won the round
   }
   updatePlayerWins(winner);  // update winning player's score;
   return winner;    // return winning player's class object
}

// reset game
function resetGame(player1, player2) {
   player1.name = 'Player 1';
   player1.wins = 0;
   player1.games = 0;
   player1.gesture = '';

   player2.name = 'Player 2';
   player2.wins = 0;
   player2.games = 0;
   player2.gesture = '';
}


/*****************************
 * helper functions
 */

// wait for user to press return to continue
function pressReturn(msg = 'Press RETURN...') {
   prompt(`\n\t\t${msg}`);
}


// prompt for standard data entry
function promptFor(label) {
   return prompt(`\t\t${label}`);
}


// prompt for gesture entry
function promptGesture(label) {
   return prompt(`\t\t${label}`, { echo: '*' });
}


function cenText(text, width = 50) {
   let padding = 0;
   if (text.length <= width) {
      padding = (width - text.length) / 2;
      return ' '.repeat(padding) + text + ' '.repeat(padding)
   }
   return text;   // omit text centering
}


// application banner
function appBanner(appTitle) {
   console.clear();
   console.log(colorBanner('\n\n\n\t\t' + ' '.repeat(46)));
   console.log(colorBanner('\t\t' + ' '.repeat(46)));
   console.log(colorBanner('\t\t' + cenText(appTitle, 46)));
   console.log(colorBanner('\t\t' + ' '.repeat(46)));
   console.log(colorBanner('\t\t' + ' '.repeat(46)));

}


function playGameBanner() {
   appBanner(appTitle);
   console.log(colorPrimary('\n\n\t\t' + cenText('*** PLAY GAME ***\n', 46)));

}


// execute application
app();


