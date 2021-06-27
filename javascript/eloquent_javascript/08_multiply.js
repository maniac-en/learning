#!/usr/bin/env node

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Retrying...");
  }
}

function reliableMultiply(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (err) {
      if (err instanceof MultiplicatorUnitFailure) {
        console.warn(err.message);
      } else return err;
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64
