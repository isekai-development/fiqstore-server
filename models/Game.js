const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Game = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    engine: {
      type: String,
      enum: ["unipin"],
      required: true,
      default: "unipin",
    },
    logo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", Game);
