const express = require("express");
const router = express.Router();

const projectController = require("../controllers/").project;
const sampleController = require("../controllers/").sample;
const productionController = require("../controllers/").production;

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index");
// });

router.get("/", (req, res) => {
  res.send("hello");
});
/* Project Router */
router.get("/api/project/:projectId/samples", projectController.listSamples);
router.get("/api/project/:assignee", projectController.list);
router.post("/api/project", projectController.addWithSamples);

/* Sample Router */
router.get("/api/sample/:id", sampleController.getByPk);
router.post("/api/samples", sampleController.upSert);

/* Production Router */
router.post("/api/production/add", productionController.addProduction);

module.exports = router;