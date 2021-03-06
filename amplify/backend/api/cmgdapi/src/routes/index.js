const express = require("express");
const router = express.Router();

const projectRoutes = require("./project");
const sampleRoutes = require("./sample");
const checkRoutes = require("./check");
const productionRoutes = require("./production");

router.get("/", (req, res) => {
  res.send("hello");
});
/* Project Router */
router.use("/api/project", projectRoutes);

/* Sample Router */
router.use("/api/samples", sampleRoutes);

//Check Router
router.use("/api/check", checkRoutes);

/* Production Router */
router.use("/api/production", productionRoutes);

module.exports = router;
