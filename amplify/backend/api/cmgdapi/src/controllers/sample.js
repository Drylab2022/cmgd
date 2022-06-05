const Project = require("../models").Project;
const Sample = require("../models").Sample;
const PropertyChecker = require("../utils/PropertyChecker");

module.exports = {
  //find sample by primary key
  getByPk(req, res) {
    const id = req.params.id;
    return Sample.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Sample with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Sample with id=" + id,
        });
      });
  },
  async upSert(req, res) {
    const checkResult = await PropertyChecker.check(req.body.samples);
    if (checkResult.errorsPool.length === 0) {
      try {
        const samples = await Sample.bulkCreate(req.body.samples, {
          updateOnDuplicate: Object.keys(Sample.rawAttributes),
        });
        res
          .status(200, { "Content-Type": "application/json" })
          .send({ checkResult: checkResult });
      } catch (err) {
        res
          .status(400, { "Content-Type": "application/json" })
          .send({ error: err.message });
      }
    } else {
      res
        .status(400, { "Content-Type": "application/json" })
        .send({ checkResult: checkResult });
    }
  },
};
