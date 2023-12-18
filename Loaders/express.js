const express = require("express");
const cors = require("cors");
const routes = require("../Routes");
module.exports = (app) => {
  app.use(
    express.json({
      limit: "50mb",
      type: ["application/json", "text/plain"],
    })
  );
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  app.use("/api", routes);

  app.get("/health", (req, res) => {
    res.send({ error: false, data: "", code: 200, message: "Server is healthy" });
  });
};
