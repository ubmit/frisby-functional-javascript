const { tryCatch, readFileSync } = require("../utils");

// const getPort = () => {
//   try {
//     const str = fs.readFileSync(pathToJson);
//     const config = JSON.parse(str);
//     return config.port;
//   } catch (e) {
//     return 3000;
//   }
// };

const getPort = () =>
  tryCatch(() => readFileSync("./config.json"))
    .chain(c => tryCatch(() => JSON.parse(c)))
    .fold(e => 3000, c => c.port);

const result = getPort();
console.log(result);
