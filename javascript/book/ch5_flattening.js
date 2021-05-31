#!/usr/bin/env node

let arrays = [[1, 2, 3], [4, 5], [6]];

// without intial value for accumulator
console.log(arrays.reduce((flat, current) => flat.concat(current)));
// with intial value for accumulator
console.log(arrays.reduce((flat, current) => flat.concat(current), []));
