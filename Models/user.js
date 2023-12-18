const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
let userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    require: true,
  },
});

userSchema.plugin(mongoosePaginate);

module.exports = userSchema;
