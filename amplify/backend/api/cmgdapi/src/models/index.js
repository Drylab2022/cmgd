const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const models = {};

models.Sample = require("./Sample")(sequelize, DataTypes);
models.Project = require("./Project")(sequelize, DataTypes);
models.ProjectProd = require("./ProjectProd")(sequelize, DataTypes);
models.SampleProd = require("./SampleProd")(sequelize, DataTypes);

models.Project.hasMany(models.Sample, {
  as: "samples",
  foreignKey: "ProjectId",
});
models.Sample.belongsTo(models.Project);

models.ProjectProd.hasMany(models.SampleProd, {
  as: "sampleProds"
});
models.SampleProd.belongsTo(models.ProjectProd);

module.exports = models;