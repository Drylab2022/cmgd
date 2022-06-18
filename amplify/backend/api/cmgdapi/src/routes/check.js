const router = require("express").Router();
const checkController = require("../controllers").check;

router.post("/", checkController.check);

module.exports = router;
