#!/usr/bin/env node

const box = {
  locked: true,
  unlock() { console.log(`Box unlocked`); this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(body) {
  try {
    return body();
  } catch (e) {
    console.log("Error raised: " + e.message);
  } finally {
    box.lock();
  }
}

// test
console.log("Before:", box);
box.unlock(); // if this is commented, this should throw an error
withBoxUnlocked(function() {
  box.content.push("gold piece");
});
console.log("After:", box);
