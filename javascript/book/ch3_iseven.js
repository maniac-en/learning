#!/usr/bin/env node

// isEven function to check weather number is odd or even using recursion

const isEven = num => {
    if (num == 0) return true;
    else if (num == 1) return false;
    else if (num < 0) return isEven(-num);
    else return isEven(num-2);
}

// test
console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));
