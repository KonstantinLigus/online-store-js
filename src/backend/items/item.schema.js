import mongoose from "mongoose";

export const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String] },
  mainImage: { type: String },
  category: { type: [String], required: true },
  label: { type: [String] },
  producer: { type: String },
  measurement: { unit: String, values: [Number] },
});

export const Item = mongoose.models.item || mongoose.model("item", itemSchema);
