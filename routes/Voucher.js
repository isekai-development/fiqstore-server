const express = require("express");
const router = express.Router();

const Voucher = require("../controllers/Voucher");

router.get("/list", Voucher.list).post("/add", Voucher.add);

module.exports = router;
