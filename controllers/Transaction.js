const fetch = require("node-fetch");

const TransactionModel = require("../models/Transaction");
const UserModel = require("../models/User");
const VoucherModel = require("../models/Voucher");
const GameModel = require("../models/Game");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const { createHash } = require("crypto");

class Transaction {
  static async list(req, res) {
    try {
      const { userId } = req.query;
      let query;
      if (userId) {
        query = { user: new ObjectId(userId) };
      } else {
        query = {};
      }
      const transaction = await TransactionModel.find(query)
        .populate("game")
        .populate({ path: "product", model: "Voucher" });
      return res.json(transaction);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async listByUser(req, res) {
    try {
      const { userId } = await req.body;
      const user = await UserModel.findById(userId);

      if (!user) throw new Error("User Not Found");

      const transaction = await TransactionModel.find({ user: user._id });

      return res.json(transaction);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async getById(req, res) {
    try {
      const { id } = await req.body;

      const transaction = await TransactionModel.findById(id);
      return res.json(transaction);
    } catch (error) {
      return res.json(error.message);
    }
  }

  static async checkGameAccount(req, res) {
    try {
      const { gameId, accountId } = await req.query;

      const game = await GameModel.findById(gameId);
      if (!game) throw new Error("Game not found");

      const account = await fetch(
        `${process.env.APIGAME}/merchant/${process.env.MERCHANTID_APIGAME}/cek-username/${game.code}?user_id=${accountId}&signature=${process.env.SIGNATURE_APIGAME}`
      )
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          return err;
        });

      return res.json(account);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async makeOrder(req, res) {
    try {
      const { userId, productId, destination } = await req.body;

      const product = await VoucherModel.findById(
        new ObjectId(productId)
      ).populate("game");
      if (!product) throw new Error("Item not found");

      let user;
      if (userId) {
        user = await UserModel.findById(userId);
      }

      const payloadDuitku = {
        paymentAmount: product.price,
        merchantOrderId: String(Date.now()),
        productDetails: product.unit,
        email: "sheknows2023@gmail.com",
        callbackUrl:
          "https://olive-walls-cough-103-181-222-27.loca.lt/transaction/confirm-payment",
        returnUrl: "https://www.google.com",
      };

      const duitkuInvoiceResponse = await fetch(
        `${process.env.DUITKU_API_URL}/merchant/createInvoice`,
        {
          method: "POST",
          body: JSON.stringify(payloadDuitku),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-duitku-signature": createHash("sha256")
              .update(
                `${process.env.DUITKU_MERCHANT_CODE}${Date.now()}${
                  process.env.DUITKU_API_KEY
                }`
              )
              .digest("hex"),
            "x-duitku-timestamp": Date.now(),
            "x-duitku-merchantcode": process.env.DUITKU_MERCHANT_CODE,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          return err;
        });

      const newTransaction = new TransactionModel({
        product: productId,
        destination,
        game: product.game._id,
        price: product.price,
        duitku_response: duitkuInvoiceResponse,
        user: user._id,
      });
      const transaction = await newTransaction.save();
      return res.json({ transaction });
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async confirmPayment(req, res) {
    try {
      const transaction = await TransactionModel.findOne({
        "duitku_response.reference": req.body.reference,
      });
      transaction.paid_response = req.body;
      transaction.status = "paid";
      const savedTransaction = await transaction.save();
      console.log({ savedTransaction });
      return res.json(savedTransaction);
    } catch (error) {
      return res.json(error.message);
    }
  }
  static async deleteTransactions(req, res) {
    try {
      const transaction = await TransactionModel.deleteMany({});
      return res.json(transaction);
    } catch (error) {
      return res.json(error.message);
    }
  }
}

module.exports = Transaction;
