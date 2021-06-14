#!/usr/bin/env node

const checkPasswordStrength = input => {
  /* Strong pass conditions:
   * Atleast one lower-case character (1st lookaround)
   * Atleast one upper-case character (2nd lookaround)
   * Atleast one decimal number (3rd lookaround)
   * Password should be of atleast 8 characters
   */
  return /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d).{8,}$/.test(input);
}

// test
console.log(checkPasswordStrength('maniac'));
console.log(checkPasswordStrength('Maniac-555'));
