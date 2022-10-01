const express = require("express");
const router = express.Router();

router.use("/employer", require("./employer"));
router.use("/worker", require("./worker"));

module.exports = router;
