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
  image: { type: String, default: null },
  city: { type: String, default: null },
  deliveryMethod: { type: String, default: null },
  postOffice: { type: String, default: null },
  phone: { type: String, default: null },
  birthday: { type: String, default: null },
  verificationToken: {
    type: String,
    default: null,
  },
});

export const User = mongoose.models.user || mongoose.model("user", user);
