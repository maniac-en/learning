#!/usr/bin/env node

const args = process.argv.slice(2);
const test_codes = require('./code-samples.js');
const shit = require('./src/app.js');

try {
  switch(args[0]) {
    case 'test':
      try {
        let testArr = [];
        var i = 0;
        for (i = 0; i < test_codes.length; i+=2) {
          testArr.push(String.raw`${shit(test_codes[i], false)}` === String.raw`${test_codes[i+1]}`);
        }
        if (!testArr.includes(false)) console.log(`\x1b[32mAll tests passed!\x1b[0m`);
      } catch (error) {
        console.log(`\x1b[31mTest failed for code:\n\x1b[33m${test_codes[i]}\x1b[0m`);
      };
      break;
    case 'verbose':
      for (let i = 0; i < test_codes.length; i+=2) {
        console.log(`\nCode ${i/2}:\x1b[35m\n${test_codes[i]}\x1b[0m`);
        console.log(shit(test_codes[i], true));
        console.log("=========================================================");
      }
      break;
    default:
      console.log('Eat Shit💩');
  }
} catch(error) {
  console.log(`\x1b[31m(${error.name}) \x1b[33m${error.message}\x1b[0m`);
}
