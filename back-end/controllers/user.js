const UserDB = require("../models").User;
const bcrypt = require("bcrypt");

const controller = {
  register: async (req, res) => {
    const user = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      phone: req.body.phone,
      city: req.body.city,
      birthDate: req.body.birthDate,
      bloodType: req.body.bloodType,
      lastDonation: req.body.lastDonation,
    };

    UserDB.create(user)
      .then(() => res.status(200).send({ message: "User created" }))
      .catch((err) => res.status(500).send(err));
  },
};

module.exports = controller;
