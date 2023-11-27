import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

export const User = mongoose.models.user || mongoose.model("user", user);
