#!/usr/bin/env node

const codes = require('./test/code-samples.js')
const shit = require('./src/app.js')

try {
  codes.forEach(code => shit(code, 0));
} catch(error) {
  console.log(`\x1b[31m(${error.name}) \x1b[33m${error.message}\x1b[0m`);
}
