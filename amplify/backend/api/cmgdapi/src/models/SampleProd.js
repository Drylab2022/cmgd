module.exports = (sequelize, DataTypes) => {
  const SampleProd = sequelize.define(
    "SampleProd",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sampleId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      curation: {
        type: DataTypes.JSON,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      createdAt: "sampleTime"
    }
  );
  return SampleProd;
};