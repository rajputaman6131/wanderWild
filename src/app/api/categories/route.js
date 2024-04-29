import Category from "@/schemaModels/category";
import { getAuthSession } from "@/utils/auth";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.nextUrl);

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 5;
  const keyword = searchParams.get("keyword");

  const POSTS_PER_PAGE = limit;

  const skip = POSTS_PER_PAGE * (page - 1); // Calculate skip value

  const query = {
    ...(keyword && { name: { $regex: keyword, $options: "i" } }),
  };

  try {
    await connectToDB();

    const categories = await Category.find(query)
      .skip(skip)
      .limit(POSTS_PER_PAGE)
      .sort({ createdAt: -1 })
      .lean();

    const count = await Category.countDocuments(query);

    return new NextResponse(
      JSON.stringify({ categories, count, currentPage: page }, { status: 200 })
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    await connectToDB();
    const body = await req.json();
    const tourCategory = await Category.create({
      ...body,
      slug: await generateUniqueSlug(body.categoryName),
    });

    return new NextResponse(JSON.stringify(tourCategory, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// Function to generate a unique slug
async function generateUniqueSlug(title) {
  // Convert title to a slug (e.g., "My Awesome Category" => "my-awesome-category")
  await connectToDB();

  let slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  // Check if a document with this slug already exists in the collection
  let existingCategory = await Category.findOne({ slug: slug });

  // If no document found with the same slug, it's unique
  if (!existingCategory) {
    return slug;
  }

  // Slug already exists, append a counter to make it unique
  let counter = 1;
  while (true) {
    let newSlug = `${slug}-${counter}`;
    existingCategory = await Category.findOne({ slug: newSlug });
    if (!existingCategory) {
      return newSlug;
    }
    counter++;
  }
}
