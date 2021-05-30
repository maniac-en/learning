#!/usr/bin/env node

const every = (array, test) => {
    let res = true;
    for (let element of array) {
        if (!test(element)) return false;
    }
    return true;
}

const every2 = (array, test) => !array.some(element => !test(element));

// test
console.log(every([1, 3, 5], n => n < 10));
console.log(every2([1, 3, 5], n => n < 10));
console.log(every([2, 4, 16], n => n < 10));
console.log(every2([2, 4, 16], n => n < 10));
console.log(every([], n => n < 10));
console.log(every2([], n => n < 10));
