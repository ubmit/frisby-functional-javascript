const { fromNullable } = require("../utils");

const userMock = {
  address: {
    street: {
      name: "Rua dos Bobos"
    }
  }
};

// const streetName = user => {
//   const address = user.address;

//   if (address) {
//     const street = address.street;

//     if (street) {
//       return street.name;
//     }
//   }

//   return "no street";
// };

const streetName = user =>
  fromNullable(user.address)
    .chain(a => fromNullable(a.street))
    .map(s => s.name)
    .fold(() => "no street", n => n);

const thirdResult = streetName(userMock);
// 'Rua dos Bobos'

module.exports = thirdResult;
