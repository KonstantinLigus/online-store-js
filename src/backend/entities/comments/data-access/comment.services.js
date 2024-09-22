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

async function getComments({ skip, limit }) {
  const comment = await Comment.find()
    .skip(skip)
    .limit(limit)
    .populate("author", ["firstName", "surname", "email", "image"]);
  return comment;
}
