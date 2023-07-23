const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Country",
    {
      ID: {
        type: DataTypes.STRING(3),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continents: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      capital: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: "No capital",
      },
      subregion: {
        type: DataTypes.STRING,
        defaultValue: "No subregion",
      },
      area: {
        type: DataTypes.STRING,
        defaultValue: "No area",
      },
      population: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
