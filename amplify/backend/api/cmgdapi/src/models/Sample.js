module.exports = (sequelize, DataTypes) => {
  const Sample = sequelize.define(
    "Sample",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sampleId: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true,
      },
      curation: {
        type: DataTypes.JSON,
      },
    },
    {
      timestamps: true,
      indexes: [{ unique: true, fields: ["sampleId", "ProjectId"] }],
    }
  );
  return Sample;
};
