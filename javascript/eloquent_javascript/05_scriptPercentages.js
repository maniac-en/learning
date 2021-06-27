#!/usr/bin/env node

const SCRIPTS = require('./scripts.js')

function countBy(items, getKeyName) {
  let counts = [];
  for (let item of items) {
    let current_key_name = getKeyName(item);
    let current_key_index = counts.findIndex(keys => keys.name == current_key_name);
    if (current_key_index == -1) { // -1 denotes that current_key_name is not present
      counts.push({name: current_key_name, count: 1});
    } else {
      counts[current_key_index].count++;
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

function textScripts(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    // none if current char is not present in any of the scripts range
    return script ? script.name : "none";
  }).filter(({name}) => name != "none");

  let total = scripts.reduce((a, b) => a += b.count, 0);
  if (total == 0) return "No scripts found";

  return scripts.map(({name, count}) => {
    return `${Math.round(count * 100 / total)}% ${name}`;
  }).join(", ");
}
console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
// → 61% Han, 22% Latin, 17% Cyrillic
