import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema(
  {
    category: { type: String, required: true },
    image: String,
  },
  { timestamps: true }
);

const Image = models.Image || model("Image", ImageSchema);

export default Image;
