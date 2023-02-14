const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const VoucherModel = require("../models/Voucher");

class Voucher {
  static async list(req, res) {
    try {
      const { gameId } = await req.query;
      let query = {};
      if (gameId) {
        query = {
          game: new ObjectId(gameId),
        };
      }
      const Vouchers = await VoucherModel.find({ ...query })
        .populate("game")
        .sort("amount");
      return res.json(Vouchers);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async add(req, res) {
    try {
      const { amount, unit, gameId, price } = await req.body;

      const Voucher = new VoucherModel({
        amount,
        unit: unit.toLowerCase(),
        game: gameId,
        price,
      });

      const response = await Voucher.save()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
      return res.json(response);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async update(req, res) {
    try {
      const { id, newObject } = await req.body;
      const query = { _id: id };

      const response = await VoucherModel.updateOne(query, {
        $set: { ...newObject },
      });
      return res.json(response);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async remove(req, res) {
    try {
      const { id } = await req.query;
      const response = await VoucherModel.deleteOne({ _id: id });
      return res.json(response);
    } catch (error) {
      return res.json(error.message);
    }
  }
}

module.exports = Voucher;
