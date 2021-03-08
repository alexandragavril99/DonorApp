module.exports = (sequelize, DataTypes) => {
  return sequelize.define("employeesVacation", {
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
  });
};
