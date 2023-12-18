const mongoose = require("mongoose");

let ConnectDB = () => {
  return new Promise(async (done, rej) => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Mongo Is Connected On :", process.env.MONGO_URI);
      done();
    } catch (error) {
      console.log("error In Mongo Connection :", error);
      rej(error);
    }
  });
};

module.exports = ConnectDB;
