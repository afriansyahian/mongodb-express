const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const objectId = require("mongodb").ObjectID;

const app = express();
const port = process.env.PORT || 3000;
const url = "mongodb://localhost:27017";
const dbName = "project-1";
let db;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client.db(dbName);
  }
);

app.get("/", (req, res) => res.send("hello World!"));
app.post("/", (req, res) => {
  db.collection("users").insertOne(
    {
      name: req.body.name,
      umur: req.body.age,
      role: req.body.role,
      hobbies: ["sing", "swim", "spend money"]
    },
    (err, result) => {
      try {
        res.send(result);
      } catch (error) {
        console.log(error);
        console.log(err);
      }
    }
  );
});
app.get("/", (req, res) => res.send("hello World!"));
app.delete("/:id", (req, res) => {
  db.collection("users").deleteOne(
    {
     _id: objectId(req.params.id)
    },
    (err, result) => {
      try {
        res.send(result);
      } catch (error) {
        console.log(error);
        console.log(err);
      }
    }
  );
});
app.get("/", (req, res) => res.send("hello World!"));
app.put("/:id", (req, res) => {
  db.collection("users").updateOne(
    {
     _id: { $eq: objectId(req.params.id) }
    },
    {$set: { name: req.body.name, age: req.body.age, role: req.body.role }},
    (err, result) => {
      try {
        res.send(result);
      } catch (error) {
        console.log(error);
        console.log(err);
      }
    }
  );
});
app
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
