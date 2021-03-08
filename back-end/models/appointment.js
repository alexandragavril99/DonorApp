module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "appointment",
    {
      date: DataTypes.STRING,
      schedulingTime: DataTypes.STRING,
      isCompleted: DataTypes.BOOLEAN,
    },
    {
      underscored: true,
    }
  );
};
