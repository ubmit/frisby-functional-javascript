const add = x => y => x + y;
const inc = add(1);

const firstResult = inc(2);
console.log(firstResult);

const modulo = dvr => dvd => dvd % dvr;
const isOdd = modulo(2);

const secondResult = isOdd(20);
console.log(secondResult);

const filter = pred => xs => xs.filter(pred);
const getAllOdds = filter(isOdd);

const thirdResult = getAllOdds([1, 2, 3, 4, 5]);
console.log(thirdResult);

const replace = regex => repl => str => str.replace(regex, repl);
const censor = replace(/[aeiou]/gi);
const replaceTarget = censor("$");

const fourthResult = replaceTarget("camila");
console.log(fourthResult);

const map = f => xs => xs.map(f);
const replaceAllTargets = map(replaceTarget);

const fifthResult = replaceAllTargets(["camila", "pimentel"]);
console.log(fifthResult);
