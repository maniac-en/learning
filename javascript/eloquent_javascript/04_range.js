#!/usr/bin/env node

const range = (start, end, step = start < end ? 1 : -1) => {
  let numArr = [];
  if (step > 0)
    for (let i = start; i <= end; i += step) numArr.push(i)
  else if (step < 0)
    for (let i = start; i >= end; i += step) numArr.push(i)
  return numArr;
}

const sum = sumArr => {
  let result = 0;
  for (let num of sumArr) {
    result += num;
  }
  return result;
}

// test
console.log(range(1, 10));
console.log(range(5, 2, -1));
console.log(sum(range(1, 10)));
