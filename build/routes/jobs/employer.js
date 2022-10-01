"use strict";

var express = require("express");

var checkUserType = require("../../middlewares/checkUserType");

var router = express.Router();

var controller = require("../../controllers/jobs/employer");

router.use(checkUserType("employer"));
router.post("/create", controller.create);
router.get("/list", controller.list);
router.get("/:jobId/get", controller.get);
module.exports = router;