"use strict";

var express = require("express");

var router = express.Router();

var controller = require("../../controllers/users");

router.get("/get", controller.get);
router.post("/create-account", controller.createAccount);
module.exports = router;