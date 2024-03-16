import { Schema, model, models } from "mongoose";

const VerificationTokenSchema = new Schema({
  identifier: { type: String, unique: true },
  token: { type: String, unique: true },
  expires: Date,
});

const VerificationToken =
  models.VerificationToken ||
  model("VerificationToken", VerificationTokenSchema);

export default VerificationToken;
