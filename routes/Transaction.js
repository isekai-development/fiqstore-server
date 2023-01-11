const express = require("express");
const router = express.Router();

const Transaction = require("../controllers/Transaction");

router
  .get("/checkAccountGame", Transaction.checkGameAccount)
  .post("/makeOrder", Transaction.makeOrder)
  .get("/list", Transaction.list)
  .post("/confirm-payment", Transaction.confirmPayment)
  .delete("/delete-all", Transaction.deleteTransactions);
module.exports = router;
