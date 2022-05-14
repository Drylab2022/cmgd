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
      numberOfReads: {
        type: DataTypes.INTEGER,
      },
      avgReadLength: {
        type: DataTypes.DOUBLE,
      },
      ncbiAccession: {
        type: DataTypes.STRING,
      },
      sequencingPlatform: {
        type: DataTypes.STRING,
      },
      curation: {
        type: DataTypes.JSON,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      createdAt: "time"
    }
  );
  return SampleProd;
};