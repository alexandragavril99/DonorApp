const express = require("express");
const app = express();
const otherController = require("./controllers").other;
const router = require("./routes");
const cors = require("cors");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

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
