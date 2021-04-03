module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "donationsHistory",
    {
      dateOfDonation: DataTypes.STRING,
    },
    {
      underscored: true,
      tableName: "donations_history",
    }
  );
};
