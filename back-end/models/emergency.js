module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "emergencies",
    {
      name: DataTypes.STRING,
      text: DataTypes.STRING,
      phone: DataTypes.STRING,
      bloodType: DataTypes.STRING,
      isAvailable: DataTypes.BOOLEAN,
    },
    {
      tableName: "emergencies",
    }
  );
};
