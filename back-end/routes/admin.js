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

router.put(
  "/updateAppointmentsDoctorById/:id",
  checkNotAuth,
  adminController.updateAppointmentsDoctorById
);

router.get(
  "/getAllAssumedAppointments",
  checkNotAuth,
  adminController.getAllAssumedAppointments
);

router.get(
  "/getDonorProfile/:id",
  checkNotAuth,
  adminController.getDonorProfile
);

router.get(
  "/getAllDonations/:id",
  checkNotAuth,
  adminController.getAllDonations
);

router.put("/updateDonor/:id", checkNotAuth, adminController.updateDonor);

module.exports = router;
