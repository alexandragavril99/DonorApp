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
      .catch((err) => {
        res.status(500).send({
          err,
        });
      });
  },
};

module.exports = controller;
