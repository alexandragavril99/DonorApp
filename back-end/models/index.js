const Sequelize = require("sequelize");
const UserModel = require("./user");
const AppointmentModel = require("./appointment");
const EmergenciesModel = require("./emergency");
const EmployeeModel = require("./employee");
// const EmployeesVacationsModel = require("./employeesVacations");
const DonationsHistoryModel = require("./donationsHistory");
const db = require("../config/db");

const User = UserModel(db, Sequelize);
const Appointment = AppointmentModel(db, Sequelize);
const Emergency = EmergenciesModel(db, Sequelize);
const Employee = EmployeeModel(db, Sequelize);
// const EmployeesVacations = EmployeesVacationsModel(db, Sequelize);
const DonationsHistory = DonationsHistoryModel(db, Sequelize);

Employee.belongsTo(User, { foreignKey: "id" });

// User.hasMany(AppointmentRef, { foreignKey: "userId" });
// AppointmentRef.belongsTo(User, { foreignKey: "userId" });

// Appointment.hasMany(AppointmentRef, { foreignKey: "appointmentId" });
// AppointmentRef.belongsTo(Appointment, { foreignKey: "appointmentId" });

// User.hasMany(AppointmentRef, { foreignKey: "doctorId" });
// AppointmentRef.belongsTo(User, { foreignKey: "doctorId" });
User.hasMany(Appointment, { foreignKey: "userId" });
Appointment.belongsTo(User, { foreignKey: "userId" });

Employee.hasMany(Appointment, { foreignKey: "doctorId" });
Appointment.belongsTo(Employee, { foreignKey: "doctorId" });

User.hasMany(DonationsHistory, { foreignKey: "userId" });
DonationsHistory.belongsTo(User, { foreignKey: "userId" });

Employee.hasMany(Emergency, { foreignKey: "doctorId" });
Emergency.belongsTo(Employee, { foreignKey: "doctorId" });

module.exports = {
  User,
  Employee,
  Emergency,
  Appointment,
  DonationsHistory,
  connection: db,
};
