module.exports = (sequelize, DataTypes) => {
  const ProjectProd = sequelize.define(
    "ProjectProd",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      projectId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberOfSamples: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      assignee: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: true,
      updatedAt: false,
      createdAt: "time"
    }
  );
  return ProjectProd;
};