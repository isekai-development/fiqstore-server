const express = require("express");
const router = express.Router();

const Merchant = require("../controllers/Merchant");

router.get("/check", Merchant.checkInfoAccount);

module.exports = router;
