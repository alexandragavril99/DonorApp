module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      city: DataTypes.STRING,
      birthDate: DataTypes.STRING,
      bloodType: DataTypes.STRING,
      lastDonation: DataTypes.STRING,
      isDoctor: DataTypes.BOOLEAN,
      isManager: DataTypes.BOOLEAN,
      canDonate: DataTypes.BOOLEAN,
      scores: DataTypes.INTEGER,
    },
    {
      underscored: true,
    }
  );
};
