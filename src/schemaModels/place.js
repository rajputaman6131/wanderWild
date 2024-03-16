import { Schema, model, models } from "mongoose";

const PlaceSchema = new Schema(
  {
    placeName: { type: String, required: true },
    slug: { type: String, required: true },
    image: String,
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Place = models.Place || model("Place", PlaceSchema);

export default Place;
