const express = require("express");
const router = express.Router();

const Game = require("../controllers/Game");

router
  .post("/add", Game.add)
  .get("/list", Game.list)
  .put("/update", Game.update)
  .delete("/remove", Game.remove);

module.exports = router;
