const ProjectProd = require("../models").ProjectProd;
const SampleProd = require("../models").SampleProd;
const Project = require("../models").Project;
const Sample = require("../models").Sample;
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

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
          attributes: ["sampleId", "curation"],
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
      res.status(400, {'Content-Type': 'application/json'}).send({error: err.message});
    }
  },

  /**
   * 1. Search data int production_sample table
   * 2. Sequelize function equals to SQL below:
   *    SELECT Distinct on ("sampleId", "draftId") *
   *    FROM "SampleProd" AS "SampleProd" LEFT OUTER JOIN "ProjectProd" AS "ProjectProd" ON
   *    "SampleProd"."ProjectProdId" = "ProjectProd"."id"
   *    Order By "sampleId", "draftId", "sampleTime" DESC
   */
  async search(req, res) {
    let page = req.body.page; // current page number (index from 0)
    let count = req.body.count; // row number each page
    let where = {}; // filter conditions

    if (req.body.filter != null) {
      where["curation"] = req.body.filter;
    }
    if (req.body.timestamp != null) {
      where["sampleTime"] = req.body.timestamp;
    }

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
        ],
        limit: count,
        offset: page * count
      });

      // if the request body contains ccfilter parameter, query db again getting all data to make statistics
      const results = {results : samples};
      if (req.body.cascading_filter != null) {
        samples = await SampleProd.findAll({
          where: where,
          attributes: [
            Sequelize.literal('DISTINCT ON("sampleId", "draftId") *'),
            "curation",
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
          ],
          raw: true
        });
        
        let ccFilter = req.body.cascading_filter; // request body parameter
        let ccRes = []; // return variable
        let stat = {}; // key: field, val: arr[] -> values of this field
        let valCount = {}; // key: value, val: number of this value

        for (let i in ccFilter) {
          stat[ccFilter[i]] = [];
        }

        // traverse samples to calculate
        for (let i in samples) {
          for (let field in stat) {
            if (field in samples[i]["curation"]) {
              let value = samples[i]["curation"][field];
              
              // skip NA value
              if (value == 'NA') {
                continue;
              }

              // -1 means related key's array already have this field (deduplication)
              if (stat[field].indexOf(value) == -1) {
                stat[field].push(value);
              }

              valCount[value] = value in valCount ? valCount[value] + 1 : 0;
            }
          }
        }
        
        // construct result format
        for (let field in stat) {
          let record = {
            field: field,
            values: []
          }

          for (let val in stat[field]) {
            record["values"].push({
              name: stat[field][val],
              count: valCount[stat[field][val]]
            })
          }

          ccRes.push(record);
        }

        results["cascading_filter"] = ccRes;
      }

      res.status(200, {'Content-Type': 'application/json'}).send(results);
    } catch (err) {
      res.status(400, {'Content-Type': 'application/json'}).send({error: err.message});
    }
  },

  /**
   * Get all fields in curation column -> json type
   */
  async getAllFields(req, res) {
    try {
      let sql = "SELECT DISTINCT json_object_keys(curation) FROM \"SampleProd\"";
      let query = await sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT});

      const fields = [];
      for (let i in query) {
        fields.push(query[i]["json_object_keys"])
      }

      res.status(200, {'Content-Type': 'application/json'}).send(fields);
    } catch (err) {
      res.status(400, {'Content-Type': 'application/json'}).send({error: err.message});
    }
  },

  /**
   * Get number of existed value in a certain json field
   */
   async countValue(req, res) {
    try {
      let sql = "SELECT entry.value AS name, COUNT(*) AS count FROM \"SampleProd\", json_each_text(\"SampleProd\".curation) AS entry WHERE entry.key = $field GROUP BY entry.value ORDER BY count DESC"
      let query = await sequelize.query(sql, { 
        type: Sequelize.QueryTypes.SELECT,
        bind: {field : req.params.field}
      });

      res.status(200, {'Content-Type': 'application/json'}).send(query);
    } catch (err) {
      res.status(400, {'Content-Type': 'application/json'}).send({error: err.message});
    }
  }
};