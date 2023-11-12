const mongoose = require("mongoose");

const petSchema = mongoose.Schema({
  name: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String, required: true },
});

module.exports = mongoose.model("Pet", petSchema);
