#!/usr/bin/env node

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(plusVec) {
    return new Vec(this.x + plusVec.x, this.y + plusVec.y);
  }

  minus(minusVec) {
    return new Vec(this.x - minusVec.x, this.y - minusVec.y);
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}


// test
console.log(new Vec(1, 2).plus(new Vec(2, 3)));
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
console.log(new Vec(3, 4).length);

