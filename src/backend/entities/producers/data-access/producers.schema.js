import mongoose from "mongoose";

const producer = new mongoose.Schema({
  name: {
    type: String,
  },
});

export const Producer =
  mongoose.models.producer || mongoose.model("producer", producer);
