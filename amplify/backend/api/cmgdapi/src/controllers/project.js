const Project = require("../models").Project;
const Sample = require("../models").Sample;

module.exports = {
  list(req, res) {
    return Project.findAll({
      where: {
        assignee: req.params.assignee,
      },
    })
      .then((project) => res.status(200).send(project))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  listSamples(req, res) {
    const { projectId } = req.params;
    return Project.findAll({
      where: { projectId },
      attributes: ["id", "projectId"],
      include: {
        model: Sample,
        as: "samples",
      },
    })
      .then((project) => res.status(200).send(project))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  addWithSamples(req, res) {
    return Project.create(
      {
        projectId: req.body.projectId,
        numberOfSamples: req.body.numberOfSamples,
        status: req.body.status,
        assignee: req.body.assignee,
        samples: req.body.samples,
      },
      {
        include: [
          {
            model: Sample,
            as: "samples",
          },
        ],
      }
    )
      .then((project) => res.status(201).send(project))
      .catch((error) => res.status(400).send(error));
  },
};
