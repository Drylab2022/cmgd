const express = require("express");
const router = express.Router();

const projectRoutes = require("./project");
const sampleRoutes = require("./sample");

router.get("/", (req, res) => {
  res.send("hello");
});
/* Project Router */
router.use("/api/project", projectRoutes);

/* Sample Router */
router.use("/api/samples", sampleRoutes);

//Check Router
router.post("/api/check", checkController.check);

module.exports = router;
