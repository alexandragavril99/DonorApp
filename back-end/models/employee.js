module.exports = (sequelize, DataTypes) => {
  return sequelize.define("employee", {
    level: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    dateOfEmployment: DataTypes.STRING,
    vacationDaysAllowed: DataTypes.INTEGER,
    vacationDaysLeft: DataTypes.INTEGER,
  });
};
