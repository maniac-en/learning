#!/usr/bin/env node

const checkPasswordStrength = input => {
  let match;

  /* Strong pass conditions:
   * Atleast one lower-case character
   * Atleast one upper-case character
   * Atleast one decimal number
   * Password should be of atleast 8 characters
   */

  if (match = input.match(/^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d).{8,}$/)) {
    return true;
  }
  else
    return false;
}

// test
console.log(checkPasswordStrength('maniac'));
console.log(checkPasswordStrength('Maniac-555'));
