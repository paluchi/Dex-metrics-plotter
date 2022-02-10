const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PairSchema = new Schema({
  token0: { type: String, required: true },
  token1: { type: String, required: true },
  pairAdress: { type: String, required: true, unique: true },
  snapshots: [],
});

module.exports = mongoose.model("pair", PairSchema);
