const express = require("express");
const checkUserType = require("middlewares/checkUserType");

const router = express.Router();

const controller = require("controllers/jobs/employer");

router.use(checkUserType("employer"));

router.post("/create", controller.create);
router.get("/list", controller.list);
router.get("/:jobId/get", controller.get);
router.post("/update", controller.update);
router.post("/delete", controller.delete);

module.exports = router;
