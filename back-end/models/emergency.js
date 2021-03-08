module.exports = (sequelize, DataTypes) => {
  return sequelize.define("emergencies", {
    name: DataTypes.STRING,
    text: DataTypes.STRING,
    photo: DataTypes.STRING,
  }, {
      tableName: "emergencies"
  });
};
