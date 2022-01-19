#!/usr/bin/env node

// function similar to Math.min

// normie version
// const min = (num1, num2) => {
//   if (num1 <= num2) return num1;
//   else return num2;
// }

// shorter version
const min = (a, b) => (a < b) ? a : b

// test
console.log(min(0, 10));
console.log(min(0, -10));
