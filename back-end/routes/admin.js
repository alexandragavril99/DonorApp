const express = require("express");
const router = express.Router();
const adminController = require("../controllers").admin;
const checkAuth = require("./user").checkAuth;
const checkNotAuth = require("./user").checkNotAuth;

router.get(
  "/getNewAppointments",
  checkNotAuth,
  adminController.getNewAppointments
);

router.get(
  "/getAssumedAppointments",
  checkNotAuth,
  adminController.getAssumedAppointments
);

router.put(
  "/updateAppointmentsDoctorById/:id",
  checkNotAuth,
  adminController.updateAppointmentsDoctorById
);

module.exports = router;
