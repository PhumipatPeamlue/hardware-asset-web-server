const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  name: { type: String },
});

module.exports = mongoose.model("type", TypeSchema);