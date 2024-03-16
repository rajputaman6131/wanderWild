const { models } = require("mongoose");
const { Schema, model } = require("mongoose");

const PackageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    packageName: { type: String, required: true },
    locationName: { type: String },
    locationEmbedSrc: { type: String },
    images: [{ type: String }],
    duration: { type: String },
    packageType: { type: String },
    numberOfTourists: { type: String },
    lastDate: Date,
    maxGuest: { type: Number },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    includedItems: [{ type: String }],
    excludedItems: [{ type: String }],
    itinerary: [
      {
        title: { type: String },
        description: { type: String },
      },
    ],
    coordinates: {
      type: {
        type: String,
        enum: ["Point"], // Ensures that the coordinates field is a GeoJSON point
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
      },
    },
    faqs: [
      {
        title: { type: String },
        description: { type: String },
      },
    ],
    categorySlug: String,
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

// Index for geospatial queries
PackageSchema.index({ coordinates: "2dsphere" });

const Package = models.Package || model("Package", PackageSchema);

module.exports = Package;
