const { List } = require("immutable-ext");

// for(x in xs) {
//   for(y in ys) {
//     for(z in zs) {}
//   }
// }

const firstResult = List.of(x => x).ap(List([1, 2, 3]));
console.log(firstResult);

const merch = () =>
  List.of(x => y => z => `${x}-${y}-${z}`)
    .ap(List(["tshirt", "sweater"]))
    .ap(List(["large", "medium", "small"]))
    .ap(List(["blue", "yellow", "purple"]));

const secondResult = merch();
console.log(secondResult);
