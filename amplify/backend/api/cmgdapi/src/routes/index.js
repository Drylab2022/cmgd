const express = require("express");
const router = express.Router();

const projectController = require("../controllers/").project;
//const sampleController = require("../controllers/").sample;

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
//router.put('/api/classroom/:id', classroomController.update);
//router.delete('/api/classroom/:id', classroomController.delete);

/* Sample Router */
//router.get("/api/sample/:projectId", sampleController.list);

module.exports = router;
