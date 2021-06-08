#!/usr/bin/env node

// return a new array
const arrayRotate = (arr, k) => arr.slice(k, arr.length).concat(arr.slice(0, k));

// return in place
const arrayRotateInPlace = (arr, k) => arr.splice(k, arr.length - 1).concat(arr);

// test
let arr = [1, 2, 3, 4, 5];
console.log(arrayRotate(arr, 4));
console.log(arrayRotateInPlace(arr, 4));
