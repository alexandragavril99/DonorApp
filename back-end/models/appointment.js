module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "appointment",
    {
      date: DataTypes.STRING,
      schedulingTime: DataTypes.STRING,
      wasPresent: DataTypes.BOOLEAN,
      isCompleted: DataTypes.BOOLEAN,
      analysisBulletin: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );
};
