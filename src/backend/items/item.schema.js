import mongoose from "mongoose";

export const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  images: { type: [String] },
  mainImage: { type: String },
  category: { type: [String] },
  label: { type: [String] },
  producer: { type: String },
});

export const Item = mongoose.models.item || mongoose.model("item", itemSchema);
