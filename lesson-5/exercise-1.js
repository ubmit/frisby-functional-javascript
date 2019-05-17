const { fromNullable } = require("../utils");

const currentUser = "Arya Stark";
const renderPage = currentUser =>
  `this page is rendered according to this user: ${currentUser}`;
const showLogin = () => "login page";

// const openSite = () => {
//   if (currentUser) {
//     return renderPage(currentUser);
//   } else {
//     return showLogin;
//   }
// };

const openSite = () =>
  fromNullable(currentUser).fold(
    e => showLogin(),
    currentUser => renderPage(currentUser)
  );

const firstResult = openSite();
// this page is rendered according to this user: Arya Stark

module.exports = firstResult;
