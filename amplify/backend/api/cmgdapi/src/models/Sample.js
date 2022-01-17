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
        unique: true,
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
      projectId: {
        type: DataTypes.INTEGER,
        // This links the categoryId column to the id column in the categories table
        references: {
          model: "Project",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
    }
  );
  return Sample;
};
