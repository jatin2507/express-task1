require("dotenv").config();
const express = require("express");
const app = express();
const ConnectDB = require("./Loaders/db");

if (process.env.PROTOCOL === "https") {
  const fs = require("fs");
  const httpsOptions = {
    key: fs.readFileSync(process.env.CERT_KEY),
    cert: fs.readFileSync(process.env.CERT_PATH),
  };

  console.log("https Server Started");
  var server = require("https").createServer(httpsOptions, app);
} else {
  console.log("http Server Started");
  var server = require("http").createServer(app);
}
require("./Loaders/express")(app);

// Start the server
Promise.all([ConnectDB()])
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT} 🚀`);
    });
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
