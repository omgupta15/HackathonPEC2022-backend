const express = require("express");
const router = express.Router();

router.use(require("middlewares/auth"));

router.use("/users", require("./users"));
router.use("/jobs", require("./jobs"));

module.exports = router;
