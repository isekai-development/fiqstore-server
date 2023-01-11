const express = require("express");
const router = express.Router();

router
  .use("/auth", require("./Auth"))
  .use("/game", require("./Game"))
  .use("/merchant", require("./Merchant"))
  .use("/transaction", require("./Transaction"))
  .use("/voucher", require("./Voucher"));

module.exports = router;
