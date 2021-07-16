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
      weight: DataTypes.INTEGER,
      bloodType: DataTypes.STRING,
      isDoctor: DataTypes.BOOLEAN,
      isManager: DataTypes.BOOLEAN,
      canDonate: DataTypes.BOOLEAN,
      scores: DataTypes.INTEGER,
      profilePicture: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );
};
