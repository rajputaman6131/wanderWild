import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  slug: { type: String, unique: true },
  title: String,
  img: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;
