const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/users");

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

  const userExists = (userName) => {
    return new Promise(async (resolve, reject) => {
      User.find({ name: userName })
        .then((result) => {
          if (result.length > 0) {
            resolve(true);
            console.log(`${userName} found`);
          } else {
            resolve(false);
            console.log(`${userName} not found`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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

  server.post("/user", jsonParser, async (req, res) => {
    const found = await userExists(req.body.name);
    if (!found) {
      const user = new User({
        name: req.body.name,
      });

      user
        .save()
        .then(() => {
          res.send("User Created");
        })
        .catch((err) => console.log(err));
    } else {
      res.send("User already exists");
    }
  });

  server.all("*", (req, res) => handle(req, res));
});
