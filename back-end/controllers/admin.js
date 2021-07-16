const UserDB = require("../models").User;
const AppointmentDB = require("../models").Appointment;
const Sequelize = require("sequelize");
const EmployeeDB = require("../models").Employee;
const DonationsHistoryDB = require("../models").DonationsHistory;
const EmergencyDB = require("../models").Emergency;
const Op = Sequelize.Op;

const controller = {
  getNewAppointments: async (req, res) => {
    try {
      const appointments = await AppointmentDB.findAll({
        where: {
          doctorId: null,
        },
        include: [
          {
            model: UserDB,
          },
        ],
      });
      res.status(200).send(appointments);
    } catch (err) {
      res.status(500).send(err);
    }
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

  getAllAssumedAppointments: async (req, res) => {
    try {
      const user = await req.user;
      const appointments = await AppointmentDB.findAll({
        where: {
          doctorId: user.id,
        },
        include: [
          {
            model: UserDB,
          },
        ],
      });

      if (appointments) {
        res.status(200).send(appointments);
      } else {
        res
          .status(400)
          .send({ message: "There are not assumed appointments." });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getDonorProfile: async (req, res) => {
    try {
      const user = await UserDB.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(400).send({ message: "The id does not exist." });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getAllDonations: async (req, res) => {
    try {
      const donations = await AppointmentDB.findAll({
        where: {
          userId: req.params.id,
          doctorId: {
            [Op.ne]: null,
          },
        },
        include: [
          {
            model: EmployeeDB,
            attributes: ["id"],
            include: [
              {
                model: UserDB,
                attributes: ["id", "name", "surname"],
              },
            ],
          },
        ],
      });
      res.status(200).send(donations);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateDonor: async (req, res) => {
    const user = await UserDB.findOne({
      where: {
        id: req.params.id,
      },
    });

    const updatedUser = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      birthDate: req.body.birthDate,
      weight: req.body.weight,
      bloodType: req.body.bloodType,
      canDonate: req.body.canDonate,
    };

    let errors = {};

    if (
      !updatedUser.name ||
      !updatedUser.surname ||
      !updatedUser.email ||
      !updatedUser.phone ||
      !updatedUser.city ||
      !updatedUser.weight ||
      !updatedUser.bloodType
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
          bloodType: updatedUser.bloodType,
          canDonate: updatedUser.canDonate,
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

  updateAppointment: async (req, res) => {
    try {
      const appointment = await AppointmentDB.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (appointment) {
        appointment
          .update({
            wasPresent: req.body.wasPresent,
            isCompleted: req.body.isCompleted,
          })
          .then(() => {
            console.log("Appointment updated!");
            if (req.body.isCompleted) {
              DonationsHistoryDB.create({
                dateOfDonation: appointment.date,
                userId: appointment.userId,
              })
                .then(() => console.log("Donation added."))
                .catch((err) => res.status(500).send(err));
              UserDB.findOne({
                where: {
                  id: appointment.userId,
                },
              }).then((user) => {
                user
                  .update({
                    scores: user.scores + 150,
                  })
                  .then(() => console.log("Score updated!"));
              });
              res.status(200).send({
                message: "Appointment updated. Donation added. Score updated.",
              });
            } else {
              res.status(200).send({ message: "Appointment updated!" });
            }
          })
          .catch((err) => res.status(500).send(err));
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateAnalysisBulletin: async (req, res) => {
    try {
      const appointment = await AppointmentDB.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (appointment) {
        appointment
          .update({
            analysisBulletin: `${req.file.filename}`,
          })
          .then(() =>
            res.status(200).send({ message: "Analyasis bulletin updated." })
          )
          .catch((err) => res.status(500).send(err));
      } else {
        res.status(400).send({ message: "The id does not exist." });
      }
    } catch (err) {
      console.log(err);
    }
  },

  getAppointmentsWithBloodType: async (req, res) => {
    try {
      const appointments = await AppointmentDB.findAll({
        where: {
          isCompleted: 1,
        },
        include: [
          {
            model: UserDB,
            attributes: ["bloodType"],
          },
        ],
      });
      res.status(200).send(appointments);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  addEmergencyCase: async (req, res) => {
    const user = await req.user;

    const emergencyCase = {
      name: req.body.name,
      text: req.body.text,
      phone: req.body.phone,
      bloodType: req.body.bloodType,
      quantity: req.body.quantity,
      donorsFound: 0,
      isAvailable: true,
      doctorId: user.id,
    };

    EmergencyDB.create(emergencyCase)
      .then(() => {
        res.status(200).send({ message: "Emergency case created!" });
      })
      .catch((err) => {
        res.status(500).send(err);
        console.log(err);
      });
  },

  getEmergencyCases: async (req, res) => {
    try {
      EmergencyDB.findAll()
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(500).send(err));
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateEmergencyCase: async (req, res) => {
    try {
      const emergency = await EmergencyDB.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (emergency) {
        emergency
          .update({
            isAvailable: req.body.isAvailable,
          })
          .then(() => res.status(200).send({ message: "Case updated." }))
          .catch((err) => res.status(500).send(err));
      } else {
        res.status(400).send({ message: "The id does not exist." });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getPercentageOfCases: async (req, res) => {
    try {
      const cases = await EmergencyDB.findAll({
        where: {
          isAvailable: 0,
        },
      });
      let nr1 = 0;
      let nr2 = 0;
      let max = cases.length;
      cases.forEach((element) => {
        const diffInMilliSeconds = Math.abs(
          new Date(element.updatedAt) - new Date(element.createdAt)
        );
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;

        if (hours < 12) {
          nr1++;
        } else nr2++;
      });

      let resolvedCases = nr1 / max;
      let unresolvedCases = nr2 / max;
      let nr = [resolvedCases, unresolvedCases];
      res.status(200).send(nr);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getAllDonors: async (req, res) => {
    try {
      const donors = await UserDB.findAll({
        where: {
          isDoctor: null,
        },
      });

      if (donors) {
        res.status(200).send(donors);
      } else {
        res.status(401).send({ message: "No donor found." });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateProfileByDoctor: async (req, res) => {
    const user = await UserDB.findOne({
      where: {
        id: req.params.id,
      },
    });

    const updatedUser = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      weight: req.body.weight,
      birthDate: req.body.birthDate,
      bloodType: req.body.bloodType,
    };
    let errors = {};

    if (
      !updatedUser.name ||
      !updatedUser.surname ||
      !updatedUser.email ||
      !updatedUser.phone ||
      !updatedUser.city ||
      !updatedUser.weight ||
      !updatedUser.birthDate ||
      !updatedUser.bloodType
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
          birthDate: updatedUser.birthDate,
          bloodType: updatedUser.bloodType,
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

  updateDonorsState: async (req, res) => {
    try {
      const user = await UserDB.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (user) {
        user
          .update({
            canDonate: req.body.canDonate,
          })
          .then(() => {
            res.status(200).send({ message: "User's state updated!" });
          });
      } else {
        res.status(401).send({ message: "The id does not exist." });
      }
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = controller;
