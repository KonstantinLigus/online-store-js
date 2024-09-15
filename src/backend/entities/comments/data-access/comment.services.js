import "@/backend/db/connectDB";
import { Comment } from "./comment.schema";

export const commentServices = Object.freeze({
  createComment,
  getComments,
});

async function createComment(commentObj) {
  const comment = await Comment.create(commentObj);
  return comment.toObject();
}

async function getComments() {
  const comment = await Comment.find().populate("author", [
    "firstName",
    "surname",
    "email",
    "image",
  ]);
  return comment;
}
