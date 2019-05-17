const { Left, Right, fromNullable } = require("../utils");
const fs = require("fs");
const path = require("path");

const pathToJson = path.resolve(__dirname, "./config.json");

// const getPort = () => {
//   try {
//     const str = fs.readFileSync(pathToJson);
//     const config = JSON.parse(str);
//     return config.port;
//   } catch (e) {
//     return 3000;
//   }
// };

const tryCatch = f => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const getPort = () =>
  tryCatch(() => fs.readFileSync(pathToJson))
    .chain(c => tryCatch(() => JSON.parse(c)))
    .fold(e => 3000, c => c.port);

const result = getPort();
console.log(result);
