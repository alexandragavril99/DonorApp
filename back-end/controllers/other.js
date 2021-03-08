const connection = require("../models").connection;

const controller = {
  //Controller function for database reset and create tables from models
  reset: (req, res) => {
    connection
      .sync({
        force: true,
      })
      .then(() => {
        res.status(200).send({
          message: "Database reset",
        });
      })
      .catch(() => {
        res.status(500).send({
          message: "Server error",
        });
      });
  },
};

module.exports = controller;
