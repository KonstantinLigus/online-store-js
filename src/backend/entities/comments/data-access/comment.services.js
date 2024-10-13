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

async function getComments({ itemId }) {
  const comment = await Comment.find({ itemId })
    .populate("author", ["firstName", "surname", "email", "image"])
    .sort("-date");
  return comment;
}
