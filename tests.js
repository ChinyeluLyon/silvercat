const assert = require("assert");
const mongoose = require("mongoose");
const { getUser, createUser, createTransaction } = require("./api/utils");

const dbURI =
  "mongodb+srv://Admin:vEjVQ36L9BZBmto2@cluster0.3wegskq.mongodb.net/curve?retryWrites=true&w=majority";

const testUserName = "control";
const testUserEmail = "control@email.com";

const testTransactionAmount = 2000;

describe("All Tests", () => {
  before((done) => {
    mongoose.connect(dbURI);
    mongoose.connection.collections.users?.deleteMany(
      { name: testUserName, email: testUserEmail },
      done()
    );
  });

  it("Creates a New User", (done) => {
    createUser(testUserName, testUserEmail).then((result) => {
      assert(result);
      done();
    });
  });

  it("should find user control", async () => {
    const found = await getUser(testUserName, testUserEmail);
    assert(found);
  });

  it("should not find unknown user", async () => {
    const found = await getUser("User fake name", "not an email");
    assert(!found);
  });
});
