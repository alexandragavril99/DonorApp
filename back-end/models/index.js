const Sequelize = require("sequelize");
const UserModel = require("./user");
const AppointmentModel = require("./appointment");
const EmergenciesModel = require("./emergency");
const EmployeeModel = require("./employee");
const EmployeesVacationsModel = require("./employeesVacations");
const DonationsHistoryModel = require("./donationsHistory");
const db = require("../config/db");

const User = UserModel(db, Sequelize);
const Appointment = AppointmentModel(db, Sequelize);
const Emergency = EmergenciesModel(db, Sequelize);
const Employee = EmployeeModel(db, Sequelize);
const EmployeesVacations = EmployeesVacationsModel(db, Sequelize);
const DonationsHistory = DonationsHistoryModel(db, Sequelize);

Employee.belongsTo(User, { foreignKey: "id" });

Employee.hasMany(EmployeesVacations, { foreignKey: "userId" });
EmployeesVacations.belongsTo(Employee, { foreignKey: "userId" });

// User.hasMany(AppointmentRef, { foreignKey: "userId" });
// AppointmentRef.belongsTo(User, { foreignKey: "userId" });

// Appointment.hasMany(AppointmentRef, { foreignKey: "appointmentId" });
// AppointmentRef.belongsTo(Appointment, { foreignKey: "appointmentId" });

// User.hasMany(AppointmentRef, { foreignKey: "doctorId" });
// AppointmentRef.belongsTo(User, { foreignKey: "doctorId" });
User.hasMany(Appointment, { foreignKey: "userId" });
Appointment.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Appointment, { foreignKey: "doctorId" });
Appointment.belongsTo(User, { foreignKey: "doctorId" });

User.hasMany(DonationsHistory, { foreignKey: "userId" });
DonationsHistory.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Emergency, { foreignKey: "userId" });
Emergency.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  User,
  Employee,
  Emergency,
  Appointment,
  EmployeesVacations,
  DonationsHistory,
  connection: db,
};
