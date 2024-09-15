import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  score: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

export const Comment =
  mongoose.models.comment || mongoose.model("comment", commentSchema);
