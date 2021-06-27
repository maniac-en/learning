function removeSpaces(string) {
  // skip empty spaces and hashes (comments)
  let skippable = string.match(/^(\s|#.*)*/);
  return string.slice(skippable[0].length);
}

function parse(program) {
  program = removeSpaces(program);
  let match, expr;
  if (match = /^"([^"]*)"/.exec(program)) {
    expr = {type: "value", value: match[1]};
  } else if (match = /^\d+\b/.exec(program)) {
    expr = {type: "value", value: Number(match[0])};
  } else if (match = /^[^\s(),#"]+/.exec(program)) {
    expr = {type: "word", name: match[0]};
  } else {
    throw new SyntaxError("Unexpected shit💩: " + program);
  }

  return parseApplications(expr, program.slice(match[0].length));
}

function parseApplications(expr, program) {
  program = removeSpaces(program);
  if (program[0] != "(") {
    return {expr: expr, rest: program};
  }

  program = removeSpaces(program.slice(1));
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    let arg = parse(program);
    expr.args.push(arg.expr);
    program = removeSpaces(arg.rest);
    if (program[0] == ",") {
      program = removeSpaces(program.slice(1));
    } else if (program[0] != ")") {
      throw new SyntaxError("Expected shit💩 : ',' or ')' ");
    }
  }
  return parseApplications(expr, program.slice(1));
}

module.exports = {
  parse,
  removeSpaces
};
