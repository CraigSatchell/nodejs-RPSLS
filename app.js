"use strict";

const prompt = require('prompt-sync')();

const { Player, gestureChoice } = require('./classes.js');


// initialize players
let p1 = new Player('Player 1');
let p2 = new Player('Player 2');

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


// main application
function app() {
   console.log("app");
}


// setup new game
function playGame(player1, player2, gestures, enemiesLst) {
   // declare local variables
   let players = 0;
   let play1 = '';
   let play2 = '';
   let winner;

   while (players !== 1 && players !== 2) {
      console.clear();
      appBanner();
      console.log('\n\t\t\t     *** PLAY GAME ***\n');
      players = parseInt(promptFor('1 or 2 players? '));
   }

   if (players === 2) {
      play1 = promptFor('Enter Name for Player 1: ');
      play2 = promptFor('Enter name for Player 2: ');
   } else {
      play1 = promptFor('Enter Name for Player 1: '); 0
      play2 = 'AI Player';
   }
   if (play1 !== '') {
      player1.name = play1;
   }
   if (play2 !== '') {
      player2.name = play2;
   }

   // get player gestures
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
      determineWinner(player1, player2, enemiesLst);
   }

}


// select gesture
function selectGestureHuman(player, gestures) {
   // declare local variables
   let selGesture = -1;

   while (selGesture < 0 || selGesture > gestures.length - 1) {
      console.clear();
      appBanner();
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


function updatePlayerWins(player) {
   player.wins += 1;
}


// select gesture
function selectGestureAI(player, gestures) {
   // declare local variables
   let selGesture;
   // assign random gesture to AI player
   selGesture = Math.floor(Math.random() * gestures.length);
   console.log('\n\t\tAI Player is thinking......');
   player.gesture = gestures[selGesture];
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
   console.log('E100: ', myEnemy);
   console.log('E101: ', myEnemy.enemies.includes(player2.gesture));
   console.log('E102: Player 1:', player1.gesture, '  Player 2:', player2.gesture);
   // determine winner
   if (myEnemy.enemies.includes(player2.gesture)) {
      winner = player2; // player two won the round
   } else {
      winner = player1; // player one won the round
   }
   updatePlayerWins(winner);  // update winning player's score;
   console.log('E110: Player 1:', player1.wins, '   Player 2:', player2.wins);
   return winner;    // return winning player's class object
}

// reset game
function resetGame(player1, player2) {
   player1.name = 'Player 1';
   player1.wins = 0;
   player1.gesture = '';
   
   player2.name = 'Player 2';
   player2.wins = 0;
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
   console.log('\n\n\t\t-----------------------------------------');
   console.log('\t\t|    ROCK PAPER SCISSORS LIZARD SPOCK   |');
   console.log('\t\t-----------------------------------------');

}



// testing
playGame(p1, p2, gestureChoice, enemiesList);
