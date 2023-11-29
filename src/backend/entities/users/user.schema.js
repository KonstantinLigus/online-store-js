import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  image: { type: String, default: null },
  city: { type: String, default: null },
  deliveryMethod: { type: String, default: null },
  postOffice: { type: String, default: null },
  phone: { type: String, default: null },
  verificationToken: {
    type: String,
    default: null,
  },
});

export const User = mongoose.models.user || mongoose.model("user", user);
