"use strict";

var express = require("express");

var router = express.Router();
router.use("/employer", require("./employer"));
router.use("/worker", require("./worker"));
module.exports = router;