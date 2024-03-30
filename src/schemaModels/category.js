import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    categoryName: { type: String, required: true },
    slug: { type: String, required: true },
    image: String,
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = models.Category || model("Category", CategorySchema);

export default Category;
