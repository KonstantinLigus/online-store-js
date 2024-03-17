import mongoose from "mongoose";

const user = new mongoose.Schema({
  firstName: {
    type: String,
    default: "",
  },
  surname: {
    type: String,
    default: "",
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
  region: { type: String, default: "" },
  city: {
    areaRef: { type: String, default: "" },
    name: { type: String, default: "" },
  },
  street: { type: String, default: "" },
  flat: { type: String, default: "" },
  deliveryType: { type: String, default: "" },
  postOffice: {
    cityRef: { type: String, default: "" },
    name: { type: String, default: "" },
  },
  customerPhone: { type: String, default: "" },
  birthday: { type: String, default: "" },
  verificationToken: {
    type: String,
    default: null,
  },
});

export const User = mongoose.models.user || mongoose.model("user", user);
