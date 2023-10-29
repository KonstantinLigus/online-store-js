import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
  products: [
    {
      productName: { type: String, required: true },
      value: { type: Number, required: true },
      price: { type: Number, required: true },
      unit: { type: String, required: true },
    },
  ],
  deliveryInfo: {
    custumerFullName: { type: String, required: true },
    city: { type: String, required: true },
    deliveryMethod: { type: String, required: true },
    postOffice: { type: String, required: true },
    customerPhone: { type: String, required: true },
    email: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    comment: { type: String, required: true },
  },
  owner: { type: String },
  isCompleted: { type: Boolean, required: true },
});

export const Order =
  mongoose.models.order || mongoose.model("order", orderSchema);
