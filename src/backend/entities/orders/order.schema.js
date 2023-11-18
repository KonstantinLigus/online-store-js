import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
  products: [
    {
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      unit: { type: String, required: true },
    },
  ],
  deliveryInfo: {
    custumerFullName: { type: String, required: true },
    city: { type: String, required: true },
    deliveryMethod: { type: String, required: true },
    postOffice: { type: Number, required: true },
    customerPhone: { type: String, required: true },
    email: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    comment: { type: String },
  },
  owner: { type: String, default: null },
  isCompleted: { type: Boolean, default: false },
  isPaid: { type: Boolean, default: false },
  dateOfPayment: { type: String, default: null },
  dateOfCreation: { type: String, required: true, default: null },
  liqPayEncodedData: {
    data: { type: String },
    signature: { type: String },
  },
});

export const Order =
  mongoose.models.order || mongoose.model("order", orderSchema);
