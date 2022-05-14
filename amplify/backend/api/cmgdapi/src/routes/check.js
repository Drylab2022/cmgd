const router = require("express").Router();
const checkController = require("../controllers").check;

router.get("/", checkController.check);

module.exports = router;