"use strict";

const prompt = require('prompt-sync')();
const { Gesture, Player, gestureChoice } = require('./gestures.js');

// players
let p1 = new Player('Player 1');
let p2 = new Player('Player 2');

// enemies list
// const enemiesRock = ['paper','spock','Paper covers rock!','Spock vaporizes Rock!'];
// const enemiesScissors = ['spock', 'rock','Spock smashes scissors!', 'Rock crushes Scissors!'];
// const enemiesPaper = ['scissors', 'lizard', 'Scissors cuts Paper!', 'Lizard eats Paper!'];
// const enemiesLizard = ['rock', 'scissors', 'Rock crushes Lizard!', 'Scissors decapitates Lizard!' ];
// const enemiesSpock = ['lizard', 'paper', 'Lizard poisons Spock!', 'Paper disproves Spock!'];

const enemiesList = [
   {
      name: 'rock',
      enemies: ['paper', 'spock'],
      messages: ['Paper covers Rock!','Spock vaporizes Rock!']
   },
   {
      name: 'scissors',
      enemies: ['spock','rock'],
      messages: ['Spock smashes Scissors!','Rock crushes Scissors!']
   },
   {
      name: 'paper',
      enemies: ['scissors','lizard'],
      messages: ['Scissors cuts Paper!','Lizard eats Paper!']
   },
   {
      name: 'lizard',
      enemies: ['rock','scissors'],
      messages: ['Rock crushes Lizard!','Scissors decapitates Lizard!']
   },
   {
      name: 'spock',
      enemies: ['lizard','paper'],
      messages: ['Lizard poisons Spock!','Paper disproves Spock!']
   }


]


// main application
function app() {
   console.log("app");
}

// add player
function addPlayers() {
   console.log('add players')
}


// setup new game
function playGame(player1, player2, gestures) {
   let players = 0; let play1 = ''; let play2 = '';
   let p1Gesture= ''; let p2Gesture = '';
   while (players !== 1 && players !== 2) {
      console.clear();
      console.log('\n\t\t*** PLAY GAME ***');
      players = parseInt(promptFor('1 or 2 players? '));
   }

   if (players === 2) {
      play1 = promptFor('Enter Name for Player 1: ');
      play2 = promptFor('Enter name for Player 2: ');
   } else {
      play1 = promptFor('Enter Name for Player 1: ');
      play2 = 'AI Player';
   }
   if (play1 !== '') {
      player1.name = play1;
   }
   if (play2 !== '') {
      player2.name = play2;
   }

   // get gestures
   if (players === 2) {
      p1Gesture = selectGesture(player1.name, gestures);
      p2Gesture = selectGesture(player2.name, gestures);
   } else {
      p1Gesture = selectGesture(player1.name, gestures);
      p2Gesture = selectGestureAI(gestures);
   }
   console.log(player1.name, p1Gesture);
   console.log(player2.name, p2Gesture);
}


// run game
function beginGame(player1, player2) {
   // player 1 turn
   // player 2 turn
   // check for winner
   // update player stats
}


// select gesture
function selectGesture(player, gestures) {
   let selGesture = -1;
   while (selGesture < 0 || selGesture > gestures.length - 1) {
      console.clear();
      console.log(`\n\t\t*** ${player}: SELECT A GESTURE ***`);
      gestures.map(function (g, index) {
         return console.log('\t\t\t', index, ' - ', g);
      })
      selGesture = promptGesture(`Select One: `);
      //console.log(parseInt(selGesture), gestures[selGesture]);
      if (isNaN(parseInt(selGesture))) {
         selGesture = -1;
      } else {
         selGesture = parseInt(selGesture);
      }
   }
   return gestures[selGesture];
}


function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

// select gesture
async function selectGestureAI(gestures) {
   let selGesture = -1;
   selGesture = Math.floor(Math.random() * gestures.length);
   console.log('\n\t\tAI Player is thinking......');
   await sleep(5000);
   return gestures[selGesture];
}




// update game statistics
function checkForWinner(gesture1, gesture2) {
   switch (gesture1) {
      case 'rock':
         break;
      case 'scissors'
   }

}



// display game statistics
function displayGameStats() {

}


// prompt for standard data entry
function promptFor(label) {
   //console.log('\n');
   return prompt(`\t\t${label}`);
}

// prompt for gesture entry
function promptGesture(label) {
   return prompt(`\t\t${label}`, { echo: '*' });
}


// testing
playGame(p1, p2, gestureChoice);
//selectGesture(p1.name, gestureChoice);
//selectGestureAI(gestureChoice);
