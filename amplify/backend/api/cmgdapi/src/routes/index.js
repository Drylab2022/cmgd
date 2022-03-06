const express = require("express");
const router = express.Router();

const projectController = require("../controllers/").project;
const sampleController = require("../controllers/").sample;
const checkController = require("../controllers").check;

/* Project Router */
router.get("/api/project/:projectId/samples", projectController.listSamples);
router.get("/api/project/:assignee", projectController.list);
router.post("/api/project", projectController.addWithSamples);
//router.put('/api/classroom/:id', classroomController.update);
//router.delete('/api/classroom/:id', classroomController.delete);

/* Sample Router */
router.get("/api/sample/:id", sampleController.getByPk);
router.post("/api/samples", sampleController.upSert);

//Check Router
router.post("/api/check", checkController.check);

module.exports = router;
