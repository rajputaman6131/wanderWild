import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  emailVerified: Date,
  image: String,
  accounts: [{ type: Schema.Types.ObjectId, ref: "Account" }],
  sessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  role: {
    type: String,
    default: "USER",
    enum: ["USER", "ADMIN"],
  },
});

const User = models.User || model("User", UserSchema);

export default User;
