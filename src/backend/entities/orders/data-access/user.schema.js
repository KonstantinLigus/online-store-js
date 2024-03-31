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
  region: {
    name: { type: String, default: "" },
    ref: { type: String, default: "" },
  },
  city: {
    name: { type: String, default: "" },
    ref: { type: String, default: "" },
  },
  street: { type: String, default: "" },
  flat: { type: String, default: "" },
  deliveryType: { type: String, default: "" },
  postOffice: {
    name: { type: String, default: "" },
    ref: { type: String, default: "" },
  },
  customerPhone: { type: String, default: "" },
  paymentMethod: { type: String, default: "card" },
  birthday: { type: String, default: "" },
  verificationToken: {
    type: String,
    default: null,
  },
});
export const User = mongoose.models.user || mongoose.model("user", user);
