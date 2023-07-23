const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Activity",
    {
      ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING,
        defaultValue: "Is not defined",
      },
      season: {
        type: DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
