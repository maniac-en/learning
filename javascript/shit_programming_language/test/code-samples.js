const codes = [
  `
  define(x, 69)
  `,
  `
  do(define(x, 10),
   >(x, 5))
  `,
  `
  do(define(plusOne, func(a, +(a, 1))),
  return(plusOne(10)))
   `,
   `
   do(define(pow, func(base, exp,
     if(equals(exp, 0),
       1,
       multiply(base, pow(base, -(exp, 1)))))),
     return(pow(2, 10)))
  `,
  `
  do(define(sum, func(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   return(sum(array(1, 2, 3))))
  `,
]

module.exports = codes;
