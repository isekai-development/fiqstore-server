const bcrypt = require("bcrypt");

const GameModel = require("../models/Game");

class Game {
  static async list(_, res) {
    try {
      const Game = await GameModel.find({});
      return res.json(Game);
    } catch (error) {
      return res.json(error);
    }
  }
  static async add(req, res) {
    try {
      const { name, engine, logo } = await req.body;

      const Game = new GameModel({
        name,
        code: name.split(" ").join("").toLowerCase(),
        engine,
        logo,
      });

      const response = await Game.save()
        .then((res) => {
          console.log({ res });
          return res;
        })
        .catch((err) => {
          return err;
        });

      return res.json(response);
    } catch (error) {
      return res.json(error);
    }
  }
  static async update(req, res) {
    try {
      const { name, newName } = await req.body;
      const query = { name };

      const response = await GameModel.updateOne(query, {
        $set: { name: newName },
      });
      return res.json(response);
    } catch (error) {
      return res.json(error);
    }
  }
  static async remove(req, res) {
    try {
      const { name } = await req.body;
      const response = await GameModel.deleteOne({ name });
      return res.json(response);
    } catch (error) {
      return res.json(error);
    }
  }
}

module.exports = Game;
