import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  description: String,
  userEmail: String,
  postSlug: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
