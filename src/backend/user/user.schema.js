import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  orders: {
    active: [String],
    completed: [String],
  },
});

export const User = mongoose.models.user || mongoose.model("user", userSchema);
