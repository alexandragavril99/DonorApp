const passportLocal = require("passport-local"); //pentru a face login pe baza de email, username etc
const bcrypt = require("bcrypt");

const LocalStrategy = passportLocal.Strategy;

const initPassport = function (passport, getUserByEmail, getUserById) {
  const authUser = async (email, password, done) => {
    const user = await getUserByEmail(email); //cautam emailul pe baza functiei definite in server.js
    console.log(user);
    if (user == null) {
      console.log("user null");
      return done(null, false, { message: "No user found!" }); //null tine loc de eroare de server, nu e cazul aici
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authUser)); //specificam ca vrem pe baza emailului si sa fol functia de mai sus
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
};

module.exports = initPassport;