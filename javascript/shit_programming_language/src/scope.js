const globalScope = Object.create(null);
// Boolean scope variables
globalScope.true = true;
globalScope.false = false;

// Arithmetic operations
["+", "/", "==", ">", "<", "-", "*"]
  .forEach(op => globalScope[op] = Function("a, b", `return a ${op} b;`));
globalScope.add = globalScope["+"];
globalScope.divide = globalScope["/"];
globalScope.equals = globalScope["=="];
globalScope.greater = globalScope[">"];
globalScope.lesser = globalScope["<"];
globalScope.minus = globalScope["-"];
globalScope.multiply = globalScope["*"];

// gen array
globalScope.array = (...values) => values;

// get array length
globalScope.length = array => {
  if (Array.isArray(array)) return array.length;
  else throw new TypeError("Expected \"Array\" type \"word\"");
}

// get array element
globalScope.element = (array, i) => {
  if (!Array.isArray(array)) throw new TypeError("Expected \"Array\" type \"word\"");
  else if ((i).isNan) throw new TypeError("Expected \"Number\" type \"word\"");
  else return array[i];
};

// print values
globalScope.print = value => {
  console.log(value);
  return value;
};

// Return words/values/apply
globalScope.return = value => value;

module.exports = globalScope;
