"use strict";

const prompt = require('prompt-sync')();
const chalk = require('chalk');

const { Player, enemiesList, gestureChoice } = require('./data.js');


// main application
function app() {
   // local variables
   let player1 = new Player('Player 1');
   let player2 = new Player('Player 2');

   playGame(player1, player2, gestureChoice, enemiesList);
   console.log('\n\t\tThanks for playing RPSLS! :)\n\n');
}


// setup new game
function playGame(player1, player2, gestures, enemiesLst) {
   // declare local variables
   let players = 0;
   let play1 = '';
   let play2 = '';
   let roundChoices = [3, 5, 7];
   let rounds;
   let roundWinner;
   let gameWinner;
   let input;

   while (players !== 1 && players !== 2) {
      playGameBanner();
      input = promptFor("1 or 2 players ('X' to Quit ) ? ");
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
   player1.name = play1 === '' ? player1.name : play1;
   player2.name = play2 === '' ? player2.name : play2;

   while (true) {
      // get rounds to play game
      while (!roundChoices.includes(rounds)) {
         playGameBanner();
         input = promptFor("Rounds you would like to play? (3, 5 or 7) or 'X' to Quit ? ");
         if (input.toUpperCase() === 'X') {
            return
         }
         rounds = parseInt(input);
      }

      let count = 1;
      while (count <= rounds) {
         // get player gestures
         appBanner();
         console.log("\n\t\t\t\tROUND " + count)
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
            console.log(chalk.yellow(`\n\t\t${roundWinner.name} won the round.`));
            console.log(chalk.green('\n\t\t' + chalk.black.bgYellow(' SCORE ') + ' ' + chalk.white(player1.name + ': ' + chalk.yellow(player1.wins) + '  ' + player2.name + ': ' + chalk.yellow(player2.wins))));
            pressReturn();

            // check for series winner
            if ((player1.wins) > (rounds / 2)) {
               gameWinner = player1;
            } else if ((player2.wins) > (rounds / 2)) {
               gameWinner = player2;
            }
            if (gameWinner !== undefined) {
               appBanner();
               console.log('\n\n');
               pressReturn(chalk.bold.whiteBright("Congratulations! " + chalk.bold.yellow(gameWinner.name) + ", you won the series."));
               gameWinner.games += 1; // update player game stats
               break;
            }
         }
      }
      input = promptFor(chalk.yellow("\n\t\tPlay another series ( Y/N ) ? ")).toUpperCase();
      if (input !== 'Y') {
         break;      // exit loop if answer is no
      }
      player1.wins = 0;    // reset player 1 wins to 0
      player2.wins = 0;    // reset player 2 wins to 0
      rounds = 0;  // reset rounds
   }
}



// select human gesture
function selectGestureHuman(player, gestures) {
   // declare local variables
   let selGesture = -1;

   while (selGesture < 0 || selGesture > gestures.length - 1) {

      console.log(`\n\t\t   *** ${player.name}: SELECT A GESTURE ***`);
      gestures.map(function (g, index) {
         return console.log('\t\t\t', index, ' - ', g);
      })
      selGesture = promptGesture(`\tSelect One: `);
      if (isNaN(parseInt(selGesture))) {
         selGesture = -1;
      } else {
         player.gesture = gestures[parseInt(selGesture)];
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



// determine winner 
function determineWinner(player1, player2, arr) {
   // declare local variables
   let winner;
   let myEnemy;

   // search ememies list for matching gesture
   myEnemy = arr.find(function (e) {
      return e.name == player1.gesture;
   });
   // console.log('E100: ', myEnemy);
   // console.log('E101: ', myEnemy.enemies.includes(player2.gesture));
   // console.log('E102: Player 1:', player1.gesture, '  Player 2:', player2.gesture);

   // determine winner
   if (myEnemy.enemies.includes(player2.gesture)) {
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


// display game statistics
function displayScoreBoard() {

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


function appBanner() {
   console.clear();
   console.log('\n\n\t\t-----------------------------------------');
   console.log('\t\t|    ROCK PAPER SCISSORS LIZARD SPOCK   |');
   console.log('\t\t-----------------------------------------');

}

function playGameBanner() {
   appBanner();
   console.log('\n\t\t\t     *** PLAY GAME ***\n');

}

// execute application
app();
