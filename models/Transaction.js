const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Transaction = new Schema(
  {
    product: {
      type: String,
      required: true,
    },
    destination: {
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
    signature: {
      type: String,
    },
    duitku_response: {
      type: Object,
      required: true,
    },
    paid_response: {
      type: Object,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "payment",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", Transaction);
