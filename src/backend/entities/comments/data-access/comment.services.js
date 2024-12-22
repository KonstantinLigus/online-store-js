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
  const comments = await Comment.find({ itemId })
    .lean()
    .populate("author", ["firstName", "surname", "email", "image"])
    .sort("-date");

  return comments.map(comment => {
    comment._id = comment._id.valueOf();
    comment.itemId = comment.itemId.valueOf();
    return comment;
  });
}
