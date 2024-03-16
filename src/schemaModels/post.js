import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    slug: { type: String, unique: true, required: true },
    title: String,
    description: String,
    images: [String],
    views: { type: Number, default: 0 },
    category: String,
    userEmail: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
