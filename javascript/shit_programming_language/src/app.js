#!/usr/bin/env node

const codes = require('./code-samples.js');
const evalTree = require('./eval.js');
const globalScope = require('./scope.js');
const {parse, removeSpaces} = require('./parse.js');

function run(code, debug = 0) {
  let codeTree = parse(code);
  if (debug == 2) {
    const util = require('util');
    console.log(util.inspect(codeTree, false, null, true));
  }
  let {expr, rest} = codeTree;
  if (removeSpaces(rest).length > 0) {
    throw new SyntaxError("Unexpected shit💩 at the end of EGG!");
  }
  else {
    let output = evalTree(expr, Object.create(globalScope));
    if (debug >= 1) {
      console.log(`Code:`, code, `\nOutput:\t`, output);
      console.log("============================================================");
    } else console.log(output);
  }
}

try {
  codes.forEach(code => run(code));
} catch(error) {
  console.log(`\x1b[31m(${error.name}) \x1b[33m${error.message}\x1b[0m`);
}
