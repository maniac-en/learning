#!/usr/bin/env node

const deepEqual = (objA, objB) => {
  // strict comparison
  if (objA === objB) return true;

  // if still false, they must be non-null objects
  if (objA == null || typeof objA != "object" ||
    objB == null || typeof objB != "object") return false;

  // store object keys as an array
  let keysA = Object.keys(objA), keysB = Object.keys(objB);

  // objects keys array must be of same length
  if (keysA.length != keysB.length) return false;

  /* should not return false if:
   * both objects have same keys and no other key
   * same keys have same values for both objects
   */
  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(objA[key], objB[key])) return false;
  }

  // if all checks passed, return true
  return true;
}

// test
let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
