#!/usr/bin/env node

const log = console.log;

const arr1 = [
  ["name", "id", "age", "weight", "Cool"],
  ["Susan", "3", "20", "120", true],
  ["John", "1", "21", "150", true],
  ["Bob", "2", "23", "90", false],
  ["Ben", "4", "20", "100", true],
];

const arr2 = [
  ["name", "id", "height"],
  ["Bob", "2", "50"],
  ["John", "1", "45"],
  ["Ben", "4", "43"],
  ["Susan", "3", "48"]
];

const arr3 = [
  ["name", "id", "parent"],
  ["Bob", "2", "yes"],
  ["John", "1", "yes"]
];

// Expected Output
// [
//      [ "name", "id", ... ],
//      [ "Susan", "3", ... ],
//      ...
//      ...
// ]

function genObjects(arr) {
    const [headings, ...data] = arr;
    return data.reduce((acc, cur) => {
        const person = {};
        for (const headingIndex in headings) {
            person[headings[headingIndex]] = cur[headingIndex];
        }
        return acc.concat(person);
    }, []);
}

const completeData = [ ...genObjects(arr1), ...genObjects(arr2), ...genObjects(arr3) ];

const mergedObj = completeData.reduce((acc, cur) => {
  const existingPersonIndex = acc.findIndex(person => person.id === cur.id);
  if (existingPersonIndex >= 0) {
    acc[existingPersonIndex] = {
      ...acc[existingPersonIndex],
      ...cur // new stuff
    }
    return acc;
  }
  // if Person doesn't exist, add'em
  return acc.concat(cur);
}, []);

let output = [[]];

// generate all labels
mergedObj.forEach(function(deets) {
    Object.getOwnPropertyNames(deets).forEach(function (label) {
        if (!output[0].includes(label)) {
            output[0].push(label);
        }
    })
});

// populate data based on labels and mergedObj
mergedObj.forEach(function(deets) {
    let deetsArray = [];
    for (let label of output[0]) {
        if (label in deets) deetsArray.push(deets[label]);
        else deetsArray.push("");
    }
    output.push(deetsArray);
});

log(output);
