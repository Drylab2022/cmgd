const ProjectProd = require("../models").ProjectProd;
const SampleProd = require("../models").SampleProd;
const Project = require("../models").Project;
const Sample = require("../models").Sample;
const Sequelize = require("sequelize")

module.exports = {
  /**
   * Add prject and its related samples into Production table
   */
  async addProduction(req, res) {
    let id = req.body.id;

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
        sampleProds: samples["samples"],
        draftId: id
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
   * - Search data int production_sample table
   * - Sequelize function equals to SQL below:
   *   SELECT Distinct on ("sampleId", "draftId") *
   *   FROM "SampleProd" AS "SampleProd" LEFT OUTER JOIN "ProjectProd" AS "ProjectProd" ON
   *   "SampleProd"."ProjectProdId" = "ProjectProd"."id"
   *   Order By "sampleId", "draftId", "sampleTime" DESC
   */
  async search(req, res) {
    let where = req.body;
    try {
      let samples = await SampleProd.findAll({
        where: where,
        attributes: [
          Sequelize.literal('DISTINCT ON("sampleId", "draftId") *'),
          "id",
          "sampleId",
          "curation",
          "sampleTime"
        ],
        include: {
          model: ProjectProd,
          attributes: [
            "draftId"
          ]
        },
        order: [
          "sampleId",
          [ProjectProd, 'draftId'],
          ['sampleTime', 'DESC']
        ]
      });

      res.status(200, {'Content-Type': 'application/json'}).send(samples);
    } catch (err) {
      console.log(err);
      res.status(400, {'Content-Type': 'application/json'}).send({error: err.message});
    }
  }
};