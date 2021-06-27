#!/usr/bin/env node

const SCRIPTS = require('./scripts.js')

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    if (scriptObj = groupName(item)) {
      let {name, direction} = scriptObj;
      let current_key_index = counts.findIndex(script => script.name == name);
      if (current_key_index == -1) { // -1 denotes that current_key_name is not present
        counts.push({name, direction, count: 1});
      } else {
        counts[current_key_index].count++;
      }
    }
  }
  return counts;
}
// console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]

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
// console.log(characterScript(121));
// → {name: "Latin", …}

function dominantDirection(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? {
      name: script.name,
      direction: script.direction
    } : null;
  });

  if (scripts.length == 0) return "No scripts found";
  return scripts.reduce((a, b) => a.count > b.count ? a : b).direction;
}

// test
console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
