const express = require("express");
const checkUserType = require("middlewares/checkUserType");

const router = express.Router();

const controller = require("controllers/jobs/worker");

router.use(checkUserType("worker"));

router.get("/list", controller.list);
router.get("/:jobId/get", controller.get);
router.post("/apply", controller.apply);

module.exports = router;
