const ProjectProd = require("../models").ProjectProd;
const SampleProd = require("../models").SampleProd;
const Project = require("../models").Project;
const Sample = require("../models").Sample;

module.exports = {
  async addProduction(req, res) {
    const projectId = req.body.projectId;

    try {
      // join all samples with certain project
      const samples = await Project.findAll({
        where: { projectId },
        attributes: ["projectId", "numberOfSamples", "status", "assignee"],
        include: {
          model: Sample,
          as: "samples",
          attributes: ["sampleId", "numberOfReads", "avgReadLength", "ncbiAccession", "sequencingPlatform", "curation"],
        },
      });
  
      // insert data into ProjectProd and SampleProd tables
      ProjectProd.create({
        projectId: samples[0]["projectId"],
        numberOfSamples: samples[0]["numberOfSamples"],
        status: samples[0]["status"],
        assignee: samples[0]["assignee"],
        sampleProds: samples[0]["samples"]
      },
        {
          include: [
            {
              model: SampleProd,
              as: "sampleProds"
            }
          ]
      });
      res.status(200).send(JSON.stringify(samples));
    } catch (err) {
      res.status(400).send(err);
    }
  },

  /**
   * query parameters:
   * https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
   */
  async query(req, res) {
    try {
      let samples = await ProjectProd.findAll({
        where: req.body,
        include: {
          model: SampleProd,
          as: "sampleProds"
        }
      });
      res.status(200).send(JSON.stringify(samples));
    } catch (err) {
      console.log(err);
      res.status(400).send(JSON.stringify(err));
    }
  }
};