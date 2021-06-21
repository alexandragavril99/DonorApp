const express = require("express");
const router = express.Router();
const adminController = require("../controllers").admin;
const checkAuth = require("./user").checkAuth;
const checkNotAuth = require("./user").checkNotAuth;
const multer = require("multer");

const store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../front-end/public/uploads");
  },
  filename: async function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: store,
  limits: { fileSize: 5_242_881 }, // Am adăugat limită de 5MB + 1 byte
});

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

router.put(
  "/updateAppointment/:id",
  checkNotAuth,
  adminController.updateAppointment
);

router.post(
  "/updateAnalysisBulletin/:id",
  upload.single("analysis"),
  checkNotAuth,
  adminController.updateAnalysisBulletin
);

router.get(
  "/getAppointmentsWithBloodType",
  checkNotAuth,
  adminController.getAppointmentsWithBloodType
);

router.post(
  "/createEmergencyCase",
  checkNotAuth,
  adminController.addEmergencyCase
);

router.get(
  "/getEmergencyCases",
  checkNotAuth,
  adminController.getEmergencyCases
);

module.exports = router;
