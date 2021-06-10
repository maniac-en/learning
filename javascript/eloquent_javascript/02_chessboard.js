#!/usr/bin/env node

let rows = 8, columns = 8;
let output = "";

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    if ((i + j) % 2 == 0) output += " ";
    else output += "#";
  }
  output += "\n";
}

// test
console.log(output);
