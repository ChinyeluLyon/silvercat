const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/users");
const Transaction = require("./models/transaction");
const { redirect } = require("next/dist/server/api-utils");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = Number(process.env.PORT) || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const jsonParser = bodyParser.json();

app.prepare().then(async () => {
  const server = express();

  const dbURI =
    "mongodb+srv://Admin:vEjVQ36L9BZBmto2@cluster0.3wegskq.mongodb.net/silvercat?retryWrites=true&w=majority";

  mongoose
    .connect(dbURI)
    .then(() =>
      server.listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      })
    )
    .catch((err) => console.log(err));

  server.use(express.static("_next"));
  server.use(express.static("../pages"));
  server.all("/_next/*", (req, res) => handle(req, res));

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
      console.log(found);
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

  const createTransaction = (userId, amount) => {
    return new Promise(async (resolve, reject) => {
      const transaction = new Transaction({
        userId,
        amount,
      });
      await transaction.save();
      const user = await User.findOne({ _id: userId });
      const newBalance = user.balance + amount;
      await user.update({ balance: newBalance });

      resolve(true);
    });
  };

  server.get("/users", jsonParser, (req, res) => {
    User.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  server.get("/user", jsonParser, async (req, res) => {
    const user = await getUser(req.query.name, req.query.email);
    if (user) {
      res.send(user);
    } else {
      res.send("no user");
    }
  });

  server.post("/user", jsonParser, async (req, res) => {
    const user = await createUser(req.body.name, req.body.email);
    res.send(user);
  });

  server.get("/transactions/:userId", jsonParser, async (req, res) => {
    Transaction.find({ userId: req.params.userId })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  server.post("/transaction", jsonParser, async (req, res) => {
    const created = await createTransaction(req.body.userId, req.body.amount);

    if (created) {
      res.send("transaction created");
    }
  });

  server.post("/sendMoney", jsonParser, async (req, res) => {
    const amount = Math.abs(req.body.amount);

    const sent = await createTransaction(req.body.currentUserId, -amount);
    const received = await createTransaction(req.body.recipientUserId, amount);

    res.send("sent and received");
  });

  server.get("/clear", async (req, res) => {
    mongoose.connection.collections.users?.deleteMany();
    mongoose.connection.collections.transactions?.deleteMany();
    res.send("Cleared");
  });

  server.all("*", (req, res) => handle(req, res));
});
