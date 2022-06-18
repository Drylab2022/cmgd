module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define(
        "Project",
        {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            projectId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            metadata: {
                type: DataTypes.JSON,
            },
            numberOfSamples: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM,
                values: ["active", "pending", "approved"],
            },
            assignee: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );
    return Project;
};
