const express = require("express");
const app = express();
const otherController = require("./controllers").other;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const port = 8081;
app.listen(port, console.log(`Server is running on port ${port}`));

app.get("/api/reset", otherController.reset);
