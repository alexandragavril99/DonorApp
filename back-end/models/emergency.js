module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "emergencies",
    {
      name: DataTypes.STRING,
      text: DataTypes.STRING,
      phone: DataTypes.STRING,
      bloodType: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      donorsFound: DataTypes.INTEGER,
      isAvailable: DataTypes.BOOLEAN,
    },
    {
      tableName: "emergencies",
    }
  );
};
