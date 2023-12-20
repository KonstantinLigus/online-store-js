import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
  },
  image: { type: String, default: "" },
  city: { type: String, default: "" },
  deliveryMethod: { type: String, default: "" },
  postOffice: { type: String, default: "" },
  phone: { type: String, default: "" },
  birthday: { type: String, default: "" },
  verificationToken: {
    type: String,
    default: null,
  },
});

export const User = mongoose.models.user || mongoose.model("user", user);
