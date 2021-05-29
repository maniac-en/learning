#!/usr/bin/env node

const reverseArray = inputArr => {
    let outArr = []
    for (let element of inputArr) outArr.unshift(element)
    return outArr;
}

const reverseArrayInPlace = inputArr => {
    for (let i = 0; i <= Math.floor(inputArr.length/2); i++) {
        let temp = inputArr[i];
        inputArr[i] = inputArr[inputArr.length - i - 1];
        inputArr[inputArr.length - i - 1] = temp;
    }
}

// test
console.log(reverseArray(["A", "B", "C"]));
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
