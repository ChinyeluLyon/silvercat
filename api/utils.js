const User = require("./models/users");
const Transaction = require("./models/transaction");

const getUser = (name, email) => {
  return new Promise(async (resolve, reject) => {
    User.findOne({ name, email })
      .then((result) => {
        if (result) {
          resolve(result);
        } else {
          resolve(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const createUser = (name, email) => {
  return new Promise(async (resolve, reject) => {
    const found = await getUser(name, email);

    if (!found) {
      const user = new User({
        name: name,
        email: email,
        balance: 100,
      });

      user
        .save()
        .then((response) => {
          resolve(response);
        })
        .catch((err) => console.log(err));
    } else {
      resolve(found);
    }
  });
};

module.exports = { getUser, createUser };
