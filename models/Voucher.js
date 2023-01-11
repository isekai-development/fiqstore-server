const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Voucher = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      unique: true,
    },
    unit: {
      type: String,
      required: true,
    },
    game: {
      type: ObjectId,
      required: true,
      ref: "Game",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voucher", Voucher);
