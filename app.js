"use strict";

const prompt = require('prompt-sync')();
const { Gesture, Player, gestureChoice } = require('./gestures.js');

// players
let p1 = new Player();
let p2 = new Player();

// enemies list
const rock = ['paper,spock'];
const scissors = ['spock', 'rock'];
const paper = ['scissors, lizard'];
const lizard = ['rock', 'scissors'];
const spock = ['lizard', 'spock'];

// main application
function app() {
   console.log("app");
}

// add player
function addPlayers() {
   console.log('add players')
}

// setup new game
function newGame() {
   let players = 0;
   while (players !== 1 && players !== 2) {
      console.clear();
      console.log('\n\t\t*** START NEW GAME ***');
      players = parseInt(promptFor('1 or 2 players? '));
   }


   // select players
   // run game
}


// run game
function beginGame() {
   let gesture;
   // player 1 turn
   // player 2 turn
   // check for winner
   // update player stats
}

// select gesture
function selectGesture(){
   let gesture = 0;
   while (gesture <0 || gesture > 4) {
      console.clear();
      console.log('\n\t\t*** SELECT GESTURE ***');
      players = parseInt(promptFor('? '));
   }
}


// select players
function selectPlayers() {

}


// update game statistics
function updateGameStats() {

}



// display game statistics
function displayGameStats() {

}


// prompt for standard data entry
function promptFor(label) {
   console.log('\n');
   return prompt(`\t\t${label}`);
}

// prompt for gesture entry
function promptGesture(label) {
   return prompt(`\t\t${label}`, { echo: '*' });
}


// testing
newGame();
// console.log(p1.name, p2.name);
// p1.name = 'Tammy';
// p1.wins = 5; p2.wins = 3;
// console.log(p1.name, p1.wins, p2.name, p2.wins);

