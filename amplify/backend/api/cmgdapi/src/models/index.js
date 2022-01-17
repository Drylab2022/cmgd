const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const models = {};

models.Sample = require("./Sample")(sequelize, DataTypes);
models.Project = require("./Project")(sequelize, DataTypes);

models.Project.hasMany(models.Sample, {
  as: "samples",
  foreignKey: "projectId",
});
models.Sample.belongsTo(models.Project);

module.exports = models;
