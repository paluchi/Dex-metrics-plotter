const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PairSchema = new Schema({
  token0: { type: Object, required: true },
  token1: { type: Object, required: true },
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  snapshots: [],
});

module.exports = mongoose.model("pairs", PairSchema);
