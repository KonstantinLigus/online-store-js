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
      ammount: { type: Number, required: true },
    },
  ],
  images: { type: [String] },
  mainImage: { type: String },
  category: { type: String, required: true },
  label: { type: [String] },
  producer: { type: String },
  term: { type: String },
  condition: { type: String },
  sort: { type: String },
  suitFor: { type: [String] },
  relatedCategories: { type: [String] },
});

export const Item = mongoose.models.item || mongoose.model("item", itemSchema);
