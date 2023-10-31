import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  fullName: { type: String },
  city: { type: String },
  deliveryMethod: { type: String },
  postOffice: { type: String },
  phone: { type: String },
});

export const User = mongoose.models.user || mongoose.model("user", userSchema);