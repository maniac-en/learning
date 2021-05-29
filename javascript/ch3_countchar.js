#!/usr/bin/env node

// count how many times a char is present in a given string

const countChar = (inputString, inputChar) => {
    let count = 0;
    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] == inputChar) count++;
    }
    return count;
}

// test
console.log(countChar("kakkerlak", "k"));
