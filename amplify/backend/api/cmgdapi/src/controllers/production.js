const ProjectProd = require("../models").ProjectProd;
const SampleProd = require("../models").SampleProd;
const Project = require("../models").Project;
const Sample = require("../models").Sample;

module.exports = {
  async addProduction(req, res) {
    const projectId = req.body.projectId;
    const samples = await Project.findAll({
      where: { projectId },
      attributes: ["projectId", "numberOfSamples", "status", "assignee"],
      include: {
        model: Sample,
        as: "samples",
        attributes: ["sampleId", "numberOfReads", "avgReadLength", "ncbiAccession", "sequencingPlatform", "curation"],
      },
    });

    Object.keys(samples).forEach(function (key) {
      ProjectProd.create({
        projectId: samples[key]["projectId"],
        numberOfSamples: samples[key]["numberOfSamples"],
        status: samples[key]["status"],
        assignee: samples[key]["assignee"],
        sampleProds: samples[key]["samples"]
      },
        {
          include: [
            {
              model: SampleProd,
              as: "sampleProds"
            }
          ]
        })
    });
    res.status(200).send(JSON.stringify(samples));
  }
};