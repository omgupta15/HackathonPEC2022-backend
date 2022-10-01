const express = require("express");
const router = express.Router();

const controller = require("controllers/users");

router.get("/get", controller.get);
router.post("/create-account", controller.createAccount);

module.exports = router;
