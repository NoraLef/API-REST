const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const WilderModel = require("./models/Wilder");

const wilderController = require("./controllers/wilders.js");

const app = express();

// database
mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", { autoIndex : true })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
  WilderModel.init().then(() => {
      const firstWilder = new WilderModel({
        name: "First Wilder",
        city: "San Francisco",
        skills: [
          { title: "HTML", votes: 10 },
          { title: "React", votes: 5 },
        ],
    });
    firstWilder
      .save()
      .then((result) => {
        console.log("success:", result);
      })
      .catch((err) => {
        console.log("error:", err);
      });
    });
});

app.get("/route", (req, res) => {
  res.send("Hello World route 1");
});

app.post("/api/wilder/create", wilderController.create);
app.get("/api/wilder/read", wilderController.read);
app.put("/api/wilder/update", wilderController.update);
app.delete("/api/wilder/delete", wilderController.delete);

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

//Start Server
app.listen(3003, () => console.log("Server started on 3003"));
