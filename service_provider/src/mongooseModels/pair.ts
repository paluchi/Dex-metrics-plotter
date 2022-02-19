import { Schema, model, connect } from "mongoose";
import { IPair } from "../types/pair";

const PairSchema = new Schema<IPair>({
  token0: { type: Object, required: true },
  token1: { type: Object, required: true },
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  snapshots: [],
});

const pairModel = model<IPair>("pairs", PairSchema);

export default pairModel;
