const { fromNullable, tryCatch, readFileSync } = require("../utils");

const exampleMock = {
  previewPath: "./previewPath.json",
  preview: ""
};

// const wrapExamples = example => {
//   if (example.previewPath) {
//     try {
//       example.preview = fs.readFileSync(example.previewPath);
//     } catch (e) {}
//   }
//   return example
// };

// const wrapExamples = example =>
//   fromNullable(example.previewPath)
//     .chain(() =>
//       tryCatch(() => (example.preview = readFileSync(example.previewPath)))
//     )
//     .fold(e => e, () => example);

const wrapExamples = example =>
  fromNullable(example.previewPath)
    .map(readFileSync)
    .map(c => JSON.parse(c))
    .fold(() => example, ex => Object.assign(example, ex));

const fifthResult = JSON.stringify(wrapExamples(exampleMock));
// '{"previewPath":"./previewPath.json","preview":"xpto"}'

module.exports = fifthResult;
