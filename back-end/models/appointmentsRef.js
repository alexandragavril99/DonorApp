module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "appointmentsRef",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      appointmentId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      doctorId: DataTypes.INTEGER,
    },
    {
      uniqueKeys: {
        unique: {
          fields: ["appointmentId", "userId"],
        },
      },
    },
    {
      underscored: true,
    }
  );
};
