const evalTree = require('./eval.js');
const globalScope = require('./scope.js');
const {parse, removeSpaces} = require('./parse.js');

const shit = (code, debug = 0) => {
  let codeTree = parse(code);
  if (debug == 2) {
    const util = require('util');
    console.log(util.inspect(codeTree, false, null, true));
  }
  let {expr, rest} = codeTree;
  if (removeSpaces(rest).length > 0) {
    throw new SyntaxError("Unexpected shit💩 at the end!");
  }
  else {
    let output = evalTree(expr, Object.create(globalScope));
    if (debug >= 1) {
      console.log(`Code:`, code, `\nOutput:\t`, output);
      console.log("=========================================================");
    } else console.log(output);
  }
}

module.exports = shit;
