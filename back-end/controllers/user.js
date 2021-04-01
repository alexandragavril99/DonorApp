const UserDB = require("../models").User;
const AppointmentDB = require("../models").Appointment;
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
      weight: req.body.weight,
      bloodType: req.body.bloodType,
      lastDonation: req.body.lastDonation,
    };
    let errors = {};

    if (
      !user.name ||
      !user.surname ||
      !user.email ||
      !user.password ||
      !user.phone ||
      !user.city ||
      !user.birthDate ||
      !user.weight ||
      !user.bloodType
    ) {
      errors.emptyFields = "Empty fields!";
      console.log("Empty fields!");
    }
    if (!user.name.match("^[A-Za-zâîășțÂÎĂȘȚ]+$")) {
      errors.name = "The name must contain only letters!";
      console.log("The name must contain only letters!");
    } else if (user.name.length < 2 || user.name.length > 30) {
      errors.name = "The name must contain between 2 and 30 characters!";
      console.log("The name must contain between 2 and 30 characters!");
    }
    if (!user.surname.match("^[A-Za-zâîășțÂÎĂȘȚ]+$")) {
      errors.surname = "The surname must contain only letters!";
      console.log("The surname must contain only letters!");
    } else if (user.surname.length < 2 || user.surname.length > 30) {
      errors.name = "The surname must contain between 2 and 30 characters!";
      console.log("The surname must contain between 2 and 30 characters!");
    }
    if (!user.email.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
      errors.email = "Incorrect email format!";
      console.log("Incorrect email format!");
    }
    if (req.body.password.length < 5) {
      errors.password = "Password should contain at least 5 characters";
      console.log("Password should contain at least 5 characters");
    }
    if (user.phone.length != 10) {
      errors.phone = "Phone must contain 10 characters!";
      console.log("Phone must contain 10 characters!");
    } else if (!user.phone.match("^[0-9]*$")) {
      errors.phone = "Phone must contain only digits!";
      console.log("Phone must contain only digits!");
    }
    if (!user.city.match("^[A-Za-zâîășțÂÎĂȘȚ]+(?:[s-][a-zA-Z]+)*$")) {
      errors.city = "City must contain only letters!";
      console.log("City must contain only letters!");
    }
    if (!Number.isInteger(user.weight)) {
      errors.weight = "Weight must contain only digits!";
      console.log("Weight must contain only digits!");
    }
    let birthDate2 = new Date(user.birthDate);
    let diff_ms = Date.now() - birthDate2.getTime();
    var age_dt = new Date(diff_ms);

    if (Math.abs(age_dt.getUTCFullYear() - 1970) < 18) {
      errors.birthDate = "Age at least 18 years!";
      console.log("Age at least 18 years");
    }

    if (Object.keys(errors).length === 0) {
      UserDB.create(user)
        .then(() => res.status(201).send({ message: "User created" }))
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(400).send(errors);
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = await req.user;
      const userData = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        city: user.city,
        birthDate: user.birthDate,
        bloodType: user.bloodType,
        weight: user.weight,
        lastDonation: user.lastDonation,
      };
      res.status(200).send(userData);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateProfile: async (req, res) => {
    const user = await req.user;
    const updatedUser = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      weight: req.body.weight,
    };
    let errors = {};

    if (
      !updatedUser.name ||
      !updatedUser.surname ||
      !updatedUser.email ||
      !updatedUser.phone ||
      !updatedUser.city ||
      !updatedUser.weight
    ) {
      errors.emptyFields = "Empty fields!";
      console.log("Empty fields!");
    }
    if (!updatedUser.name.match("^[A-Za-zâîășțÂÎĂȘȚ]+$")) {
      errors.name = "The name must contain only letters!";
      console.log("The name must contain only letters!");
    } else if (updatedUser.name.length < 2 || updatedUser.name.length > 30) {
      errors.name = "The name must contain between 2 and 30 characters!";
      console.log("The name must contain between 2 and 30 characters!");
    }
    if (!updatedUser.surname.match("^[A-Za-zâîășțÂÎĂȘȚ]+$")) {
      errors.surname = "The surname must contain only letters!";
      console.log("The surname must contain only letters!");
    } else if (
      updatedUser.surname.length < 2 ||
      updatedUser.surname.length > 30
    ) {
      errors.name = "The surname must contain between 2 and 30 characters!";
      console.log("The surname must contain between 2 and 30 characters!");
    }
    if (!updatedUser.email.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
      errors.email = "Incorrect email format!";
      console.log("Incorrect email format!");
    }
    if (updatedUser.phone.length != 10) {
      errors.phone = "Phone must contain 10 characters!";
      console.log("Phone must contain 10 characters!");
    } else if (!updatedUser.phone.match("^[0-9]*$")) {
      errors.phone = "Phone must contain only digits!";
      console.log("Phone must contain only digits!");
    }
    if (
      !updatedUser.city.match(
        "^[A-Za-zâîășțÂÎĂȘȚ]+(?:[s-][A-Za-zâîășțÂÎĂȘȚ]+)*$"
      )
    ) {
      errors.city = "City must contain only letters!";
      console.log("City must contain only letters!");
    }
    if (!Number.isInteger(updatedUser.weight)) {
      errors.weight = "Weight must contain only digits!";
      console.log("Weight must contain only digits!");
    }

    if (Object.keys(errors).length === 0) {
      user
        .update({
          name: updatedUser.name,
          surname: updatedUser.surname,
          email: updatedUser.email,
          phone: updatedUser.phone,
          city: updatedUser.city,
          weight: updatedUser.weight,
        })
        .then(() => {
          res.status(200).send({ message: "User updated!" });
        })
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(400).send(errors);
      console.log(errors);
    }
  },

  updatePassword: async (req, res) => {
    const user = await req.user;
    const password = {
      oldPassword: await bcrypt.hash(req.body.oldPassword, 10),
      newPassword: await bcrypt.hash(req.body.newPassword, 10),
    };
    let errors = {};

    if (!password.oldPassword || !password.newPassword) {
      errors.emptyFields = "Empty fields!";
      console.log("Empty fields!");
    }

    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isMatch) {
      errors.unmatchedPassword = "Password does not match";
      console.log("Passwords does not match");
    }

    if (req.body.newPassword.length < 5) {
      errors.newPassword = "Password should contain at least 5 characters!";
      console.log("Password should contain at least 5 characters!");
    } else if (req.body.oldPassword === req.body.newPassword) {
      errors.password =
        "New password should be different than the last password";
      console.log("New password should be different than the last password");
    }

    if (Object.keys(errors).length === 0) {
      user
        .update({
          password: password.newPassword,
        })
        .then(() => {
          res.status(200).send({ message: "User updated" });
        })
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(400).send(errors);
    }
  },

  addAppointment: async (req, res) => {
    const user = await req.user;
    const appointment = {
      date: req.body.date,
      schedulingTime: req.body.schedulingTime,
      userId: user.id,
    };

    AppointmentDB.create(appointment)
      .then(() => {
        res.status(200).send({ message: "Appointment created!" });
      })
      .catch((err) => res.status(500).send(err));
  },

  getAllAppointments: async (req, res) => {
    AppointmentDB.findAll()
      .then((appointments) => res.status(200).send(appointments))
      .catch((err) => res.status(500).send(err));
  },

  updateAppointmentsDoctorById: async (req, res) => {
    const user = await req.user;
    const appointment = await AppointmentDB.findOne({
      where: { id: req.params.id },
    });

    if (appointment) {
      appointment
        .update({
          doctorId: user.id,
        })
        .then(() => res.status(200).send({ message: "Appointment taken!" }))
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(400).send({ message: "The id does not exist!" });
    }
  },
};

module.exports = controller;
