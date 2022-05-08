const Project = require("../models").Project;
const Sample = require("../models").Sample;

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
  upSert(req, res) {
    return Sample.upsert({
      //id: req.body.id,
      sampleId: req.body.sampleId,
      curation: req.body.curation,
      ProjectId: req.body.ProjectId,
    })
      .then((sample) => res.status(200).send(sample))
      .catch((error) => res.status(400).send(error));
  },
};
