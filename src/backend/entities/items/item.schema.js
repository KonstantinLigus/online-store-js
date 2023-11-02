import mongoose from "mongoose";

export const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  prices: [
    {
      price: { type: Number, required: true },
      actionPrice: { type: Number },
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
  ],
  images: { type: [String] },
  mainImage: { type: String },
  category: { type: [String], required: true },
  label: { type: [String] },
  producer: { type: String },
});

export const Item = mongoose.models.item || mongoose.model("item", itemSchema);
