const words = Object.create(null);

// =======================
words.if = (args, scope) => {
  if (args.length != 3) {
    throw new SyntaxError("Shit💩 number of arguments for \"if\"");
  } else if (evalTree(args[0], scope) !== false) {
    return evalTree(args[1], scope);
  } else {
    return evalTree(args[2], scope);
  }
};
// =======================
words.while = (args, scope) => {
  if (args.length != 2) {
    throw new SyntaxError("Shit💩 number of arguments for \"while\"");
  }
  while (evalTree(args[0], scope) !== false) {
    evalTree(args[1], scope);
  }
  return false; // return false if undefined
};
// =======================
words.do = (args, scope) => {
  let value = false;
  // keep doing shit
  for (let arg of args) {
    value = evalTree(arg, scope);
  }
  return value;
};
// =======================
words.define = (args, scope) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("\"define\" used in a shitty💩 way!");
  }
  let value = evalTree(args[1], scope);
  scope[args[0].name] = value;
  return value;
};
// =======================
words.func = (args, scope) => {
  if (!args.length) {
    throw new SyntaxError("\"func\" body is shit💩");
  }
  let body = args[args.length - 1];
  let params = args.slice(0, args.length - 1).map(expr => {
    if (expr.type != "word") {
      throw new SyntaxError("\"func\" parameters are shit💩");
    }
    return expr.name;
  });

  return function() {
    if (arguments.length != params.length) {
      throw new SyntaxError("Shit💩 number of arguments for \"func\"");
    }
    let localScope = Object.create(scope);
    for (let i = 0; i < arguments.length; i++) {
      localScope[params[i]] = arguments[i];
    }
    return evalTree(body, localScope);
  };
};
// =======================

function evalTree(expr, scope) {
  if (expr.type == "value") {
    return expr.value;
  } else if (expr.type == "word") {
    if (expr.name in scope) {
      return scope[expr.name];
    } else {
      throw new ReferenceError( `Shit💩 is undefined: ${expr.name}`);
    }
  } else if (expr.type == "apply") {
    let {operator, args} = expr;
    if (operator.type == "word" &&
      operator.name in words) {
      return words[operator.name](expr.args, scope);
    } else {
      let op = evalTree(operator, scope);
      if (typeof op == "function") {
        return op(...args.map(arg => evalTree(arg, scope)));
      } else {
        throw new TypeError(`${op} is a shitty💩 non-func`);
      }
    }
  }
}

module.exports = evalTree;
