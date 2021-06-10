#!/usr/bin/env node

const str = `
searchengine=https://duckduckgo.com/?q=$1
spitefulness=9.7

; comments are preceded by a semicolon...
; each section concerns an individual enemy
[larry]
fullname=Larry Doe
type=kindergarten bully
website=http://www.geocities.com/CapeCanaveral/11451

[davaeorn]
fullname=Davaeorn
type=evil wizard
outputdir=/home/marijn/enemies/davaeorn`;

const escaped_str = str.replace(/[\\\[\]\.\+\*\?\(\)\{\|\^\$]/mg, '\\$&');

const parsed_obj = input => {
  let obj = {};
  let section = obj;
  let match;
  input.split(/\r?\n/).forEach( line => {
    if (match = line.match(/^(\w+)=(.*)$/)) {
      section[match[1]] = match[2];
    } else if (match = line.match(/^\\\[(.*)\\\]$/)) {
      section = obj[match[1]] = {};
    } else if (!/^\s*(;.*)?$/.test(line)) {
      // do nothing for ignored/commented lines
      // handle invalid lines
      throw new Error("Line '" + line + "' is not valid.");
    }
  });
  return obj;
};

// test, and print unescaped, pretty output
try {
  const unescaped_obj = JSON.parse(JSON.stringify(parsed_obj(escaped_str)).replace(/\\/mg, ''));
  console.log(unescaped_obj);
} catch (e) {
  console.log(e);
}
