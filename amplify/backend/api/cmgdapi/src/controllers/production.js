const ProjectProd = require("../models").ProjectProd;
const SampleProd = require("../models").SampleProd;
const Project = require("../models").Project;
const Sample = require("../models").Sample;

module.exports = {
  /**
   * Add prject and its related samples into Production table
   */
  async addProduction(req, res) {
    let id = req.body.id;
    console.log(id);

    try {
      // join all samples with certain project
      const samples = await Project.findByPk(id, {
        attributes: ["projectId", "numberOfSamples", "status", "assignee"],
        include: [{
          model: Sample,
          as: "samples",
          attributes: ["sampleId", "numberOfReads", "avgReadLength", "ncbiAccession", "sequencingPlatform", "curation"],
        }]
      });

      // not find this project in project table
      if (samples == null) {
        res.status(404, {'Content-Type': 'application/json'})
           .send({error: "'id' not found in Project table"});
        return;
      }
  
      // insert data into ProjectProd and SampleProd tables
      ProjectProd.create({
        projectId: samples["projectId"],
        numberOfSamples: samples["numberOfSamples"],
        status: samples["status"],
        assignee: samples["assignee"],
        sampleProds: samples["samples"]
      },
        {
          include: [
            {
              model: SampleProd,
              as: "sampleProds"
            }
          ]
      });
      res.status(200, {'Content-Type': 'application/json'}).send();
    } catch (err) {
      console.log(err);
      res.status(400, {'Content-Type': 'application/json'}).send({error: err.message});
    }
  },

  /**
   * Search data int production_sample table
   */
  async search(req, res) {
    let where = {curation: req.body}
    try {
      let samples = await SampleProd.findAll({where: where});
      res.status(200, {'Content-Type': 'application/json'}).send(samples);
    } catch (err) {
      console.log(err);
      res.status(400, {'Content-Type': 'application/json'}).send({error: err.message});
    }
  }
};