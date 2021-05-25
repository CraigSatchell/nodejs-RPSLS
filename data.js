"use strict";

// define selectable game gestures
const gestureChoice = ['rock', 'paper', 'scissors', 'lizard', 'spock'];


// enemies list
const enemiesList = [
   {
      name: 'rock',
      enemies: [
         {
            name: 'paper',
            message: 'Paper covers Rock!'
         },
         {
            name: 'spock',
            message: 'Spock vaporizes Rock'
         }
      ]
   },
   {
      name: 'scissors',
      enemies: [
         {
            name: 'spock',
            message: 'Spock smashes Scissors'
         },
         {
            name: 'rock',
            message: 'Rock crushes Scissors'
         }
      ]
   },
   {
      name: 'paper',
      enemies: [
         {
            name: 'scissors',
            message: 'Scissors cuts Paper'
         },
         {
            name: 'lizard',
            message: 'Lizard eats Paper'
         }
      ]
   },
   {
      name: 'lizard',
      enemies: [
         {
            name: 'rock',
            message: 'Rock crushes Lizard'
         },
         {
            name: 'scissors',
            message: 'Scissors decapitates Lizard'
         }
      ]
   },
   {
      name: 'spock',
      enemies: [
         {
            name: 'lizard',
            message: 'Lizard poisons Spock'
         },
         {
            name: 'paper',
            message: 'Paper disproves Spock'
         }
      ]
   }
]


// default exports
module.exports.gestureChoice = gestureChoice;
module.exports.enemiesList = enemiesList;