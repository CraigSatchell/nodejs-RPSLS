const prompt = require('prompt-sync')();
const chalk = require('chalk');


const appTitle = 'ROCK PAPER SCISSORS LIZARD SPOCK (RPSLS)';

// ui color definitions
const colorBanner = chalk.black.bgWhite;
const colorPrimary = chalk.white;
const colorPrimaryHighlight = chalk.black.bgWhite;
const colorSecondary = chalk.green;
const colorSecondaryHighlight = chalk.black.bgGreen;
const colorInline = chalk.white;


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


module.exports.cenText = cenText;
module.exports.promptGesture = promptGesture;
module.exports.promptFor = promptFor;
module.exports.pressReturn = pressReturn;
module.exports.appBanner = appBanner;
module.exports.playGameBanner = playGameBanner;
module.exports.appTitle = appTitle;
module.exports.colorBanner = colorBanner;
module.exports.colorPrimary = colorPrimary;
module.exports.colorPrimaryHighlight = colorPrimaryHighlight;
module.exports.colorSecondary = colorSecondary;
module.exports.colorSecondaryHighlight = colorSecondaryHighlight;
module.exports.colorInline = colorInline;
