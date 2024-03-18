import Post from "@/schemaModels/post";
import { getAuthSession } from "@/utils/auth";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.nextUrl);

  const page = parseInt(searchParams.get("page")) || 1; // Convert page parameter to number
  const cat = searchParams.get("cat");

  const POSTS_PER_PAGE = parseInt(searchParams.get("limit")) || 6;

  const skip = POSTS_PER_PAGE * (page - 1); // Calculate skip value

  const query = {
    ...(cat && { catSlug: cat }),
  };

  try {
    await connectToDB();

    const posts = await Post.find(query)
      .skip(skip)
      .limit(POSTS_PER_PAGE)
      .lean();

    const count = await Post.countDocuments(query);

    return new NextResponse(
      JSON.stringify({ posts, count, currentPage: page }, { status: 200 })
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A POST
export const POST = async (req) => {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }

    await connectToDB();
    const body = await req.json();
    const post = await Post.create({
      ...body,
      slug: await generateUniqueSlug(body.title),
      userEmail: session.user.email,
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// Function to generate a unique slug
async function generateUniqueSlug(title) {
  // Convert title to a slug (e.g., "My Awesome Post" => "my-awesome-post")
  let slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  // Check if a document with this slug already exists in the collection
  let existingPost = await Post.findOne({ slug: slug });

  // If no document found with the same slug, it's unique
  if (!existingPost) {
    return slug;
  }

  // Slug already exists, append a counter to make it unique
  let counter = 1;
  while (true) {
    let newSlug = `${slug}-${counter}`;
    existingPost = await Post.findOne({ slug: newSlug });
    if (!existingPost) {
      return newSlug;
    }
    counter++;
  }
}
