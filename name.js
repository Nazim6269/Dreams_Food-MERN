// function add() {
//   try {
//     return 100;
//   } finally {
//     return 200;
//   }
// }

// let output = add();
// console.log(output);

// const arr = [3, 4, 7, 5];
// arr.reduceRight((acc, curr) => {
//   console.log(acc);
//   console.log(curr);
// });

// const arr2 = [3, 4, 7, 5];
// arr2.reduceRight((acc, curr) => {
//   console.log("Accumulator:", acc);
//   console.log("Current Value:", curr);
//   //return acc;
// });

(function add() {
  const x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);
