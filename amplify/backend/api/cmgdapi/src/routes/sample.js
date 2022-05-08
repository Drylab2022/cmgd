const router = require("express").Router();
const sampleController = require("../controllers/").sample;

router.get("/:id", sampleController.getByPk);
router.post("/", sampleController.upSert);

module.exports = router;
