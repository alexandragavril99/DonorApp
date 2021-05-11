const UserDB = require("../models").User;
const AppointmentDB = require("../models").Appointment;

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
  getAssumedAppointments: async (req, res) => {
    try {
      const user = await req.user;
      console.log(user);
      const appointments = await AppointmentDB.findAll({
        where: {
          doctorId: user.id,
        },
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
};

module.exports = controller;
