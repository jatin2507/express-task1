let userSchema = require("./user");
let mongoose = require("mongoose");

const dbModels = { user: mongoose.model("user", userSchema) };

module.exports = dbModels;
