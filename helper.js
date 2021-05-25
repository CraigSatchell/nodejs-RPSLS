const prompt = require('prompt-sync')();

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


module.exports.cenText = cenText;
module.exports.promptGesture = promptGesture;
module.exports.promptFor = promptFor;
module.exports.pressReturn = pressReturn;
