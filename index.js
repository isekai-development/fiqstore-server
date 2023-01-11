const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const Database = require("./database");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const database = new Database();
database.connectMongodb();

app.use(require("./routes"));

app.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log("Server running in port 3000");
});
