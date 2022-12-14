const express = require("express");
const checkUserType = require("middlewares/checkUserType");

const router = express.Router();

const controller = require("controllers/jobs/employer");

router.use(checkUserType("employer"));

router.get("/:jobId/get", controller.get);
router.get("/list", controller.list);

router.post("/create", controller.create);
router.post("/:jobId/update", controller.update);
router.post("/:jobId/delete", controller.delete);

module.exports = router;
