const evalTree = require('./eval.js');
const globalScope = require('./scope.js');
const {parse, removeSpaces} = require('./parse.js');

const shit = (code, debug = false) => {
  let codeTree = parse(code);
  let {expr, rest} = codeTree;
  if (removeSpaces(rest).length > 0) {
    throw new SyntaxError("Unexpected shit💩 at the end!");
  }
  else {
    let output = evalTree(expr, Object.create(globalScope));
    if (debug) {
      const util = require('util');
      console.log(`CodeTree:\n${util.inspect(codeTree, false, null, true)}`);
      console.log("=========================================================");
    }
    return output;
  }
}

module.exports = shit;
