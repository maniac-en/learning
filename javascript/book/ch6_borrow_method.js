#!/usr/bin/env node

// Can you think of a way to call hasOwnProperty on an object that has its own
// property by that name?

let map = {one: true, two: true, hasOwnProperty: true};

// will not work
// console.log(map.hasOwnProperty("one"));

// will work
console.log(Object.prototype.hasOwnProperty.call(map, "one"));
