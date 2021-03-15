const express = require("express");
const router = express.Router();
const userController = require("../controllers").user;
const passport = require("passport");

router.post("/register", userController.register);

router.post(
  "/login",
  checkAuth,
  passport.authenticate("local", {
    successRedirect: "/api/user/success",
    failureRedirect: "/api/user/fail",
  })
);

router.get("/success", async (req, res) => {
  res.status(200).send(await req.session);
});

router.get("/fail", async (req, res) => {
  res.status(403).send({ message: "Email or password does not match!" });
});

router.delete("/logout", checkNotAuth, async (req, res) => {
  req.logOut();
  res.status(200).send({ message: "Logged out" });
});

router.get("/notAuth", async (req, res) => {
  res.status(403).send({ message: "You are not logged in." });
});

router.get("/alreadyAuth", async (req, res) => {
  res.status(403).send({ message: "You are already logged in." });
});

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/api/user/alreadyAuth");
  }
  return next();
}

function checkNotAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/api/user/notAuth");
}

router.get("/profile", checkNotAuth, async (req, res) => {
  const user = await req.user;
  res.status(200).send(user);
});

module.exports = router;
