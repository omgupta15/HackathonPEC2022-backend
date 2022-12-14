const express = require("express");
const checkUserType = require("middlewares/checkUserType");

const router = express.Router();

const controller = require("controllers/jobs/worker");

router.use(checkUserType("worker"));

router.get("/:jobId/get", controller.get);
router.get("/list", controller.list);

router.post("/:jobId/apply", controller.apply);

module.exports = router;
