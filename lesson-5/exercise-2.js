const { Left, Right } = require("../utils");

const userMock = {
  premium: true,
  preferences: "garlic sauce"
};

const defaultPrefs = "without garlic sauce";

const loadPrefs = userPreferences =>
  `these are the user preferences: ${userPreferences}`;

// const getPrefs = user => {
//   if (user.premium) {
//     return loadPrefs(user.preferences);
//   } else {
//     return defaultPrefs;
//   }
// };

const getPrefs = user =>
  (user.premium ? Right(user) : Left("not premium"))
    .map(u => user.preferences)
    .fold(() => defaultPrefs, userPreferences => loadPrefs(userPreferences));

const secondResult = getPrefs(userMock);
// 'these are the user preferences: garlic sauce'

module.exports = secondResult;
