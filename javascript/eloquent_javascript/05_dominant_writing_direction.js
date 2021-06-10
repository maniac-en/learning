#!/usr/bin/env node

require('./scripts.js')

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let scriptObj = groupName(item);
    let name = scriptObj.name;
    let direction = scriptObj.direction;
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, direction, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

function dominantDirection(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? {
      name: script.name,
      direction: script.direction
    } : "none";
  }).filter((obj) => obj.direction);

  if (scripts.length == 0) return "No scripts found";
  return scripts.reduce((a, b) => a.count > b.count ? a : b).direction;
}

// test
console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
