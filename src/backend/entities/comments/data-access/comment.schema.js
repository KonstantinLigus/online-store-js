import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  itemId: { type: mongoose.Schema.Types.ObjectId },
});

export const Comment =
  mongoose.models.comment || mongoose.model("comment", commentSchema);
