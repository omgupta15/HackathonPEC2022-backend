"use strict";

var express = require("express");

var checkUserType = require("../../middlewares/checkUserType");

var router = express.Router();

var controller = require("../../controllers/jobs/worker");

router.use(checkUserType("worker"));
router.get("/list", controller.list);
router.get("/:jobId/get", controller.get);
router.post("/apply", controller.apply);
module.exports = router;