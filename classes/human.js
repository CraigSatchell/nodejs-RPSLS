"use strict";

const Player = require('./player')

class Human extends Player {
   constructor(name) {
      super(name);
      this.isHuman = true;

   }
}

module.exports = Human;