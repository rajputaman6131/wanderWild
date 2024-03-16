import { Schema, model, models } from "mongoose";

const SessionSchema = new Schema({
  sessionToken: { type: String, unique: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  expires: Date,
});

const Session = models.Session || model("Session", SessionSchema);

export default Session;
