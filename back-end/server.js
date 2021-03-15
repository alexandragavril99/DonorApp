const express = require("express");
const app = express();
const otherController = require("./controllers").other;
const router = require("./routes");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const initPassport = require("./passport/passport-config");
const UserModel = require("./models").User;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

initPassport(
  passport,
  async (email) => {
    return await UserModel.findOne({ where: { email: email } });
  },
  async (id) => {
    return await UserModel.findOne({ where: { id: id } });
  }
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    name: "cookieLogin",
    cookie: {
      httpOnly: false,
      maxAge: 3600000,
    },
  })
);

app.use(passport.initialize()); //initializam passport in cadrul aplicatiei
app.use(passport.session()); //vrem ca datele sa fie persistente de-a lungul intregii sesiuni a userului


const corsOptions = {
  origin: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Methods",
    "Access-Control-Request-Headers",
  ],
  credentials: true,
  enablePreflight: true,
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const port = 8081;
app.listen(port, console.log(`Server is running on port ${port}`));

app.get("/api/reset", otherController.reset);

app.use("/api", router);
