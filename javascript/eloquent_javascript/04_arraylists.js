#!/usr/bin/env node

const arrayToList = inputArr => {
  let list = {
    value : inputArr[0],
    rest : inputArr.length == 1 ? null : arrayToList(inputArr.slice(1))
  }
  return list;
}

const listToArray = inputList => {
  let arr = []
  for (let rest = inputList; rest; rest = rest.rest) {
    arr.push(rest.value);
  }
  return arr;
}

const prepend = (inputValue, inputList) => {
  let list = {
    value : inputValue,
    rest : inputList
  }
  return list;
}

const nth = (inputList, index) => {
  let count = 0;
  for (let rest = inputList; rest; rest = rest.rest) {
    if (count == index) return rest.value;
    else count++;
  }
}

// test
console.log(arrayToList([10, 20, 30]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));
