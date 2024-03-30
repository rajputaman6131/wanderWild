import Package from "@/schemaModels/package";
import { getAuthSession } from "@/utils/auth";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.nextUrl);

  const page = parseInt(searchParams.get("page")) || 1; // Convert page parameter to number
  const cat = searchParams.get("cat");

  const POSTS_PER_PAGE = 6;

  const skip = POSTS_PER_PAGE * (page - 1); // Calculate skip value

  const query = {
    ...(cat && { catSlug: cat }),
  };

  try {
    await connectToDB();

    const packages = await Package.find(query)
      .skip(skip)
      .limit(POSTS_PER_PAGE)
      .sort({ createdAt: -1 })
      .lean();

    const count = await Package.countDocuments(query);

    return new NextResponse(
      JSON.stringify({ packages, count, currentPage: page }, { status: 200 })
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

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
    const tourPackage = await Package.create({
      ...body,
      slug: await generateUniqueSlug(body.packageName),
    });

    return new NextResponse(JSON.stringify(tourPackage, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// Function to generate a unique slug
async function generateUniqueSlug(title) {
  // Convert title to a slug (e.g., "My Awesome Package" => "my-awesome-package")
  await connectToDB();

  let slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  // Check if a document with this slug already exists in the collection
  let existingPackage = await Package.findOne({ slug: slug });

  // If no document found with the same slug, it's unique
  if (!existingPackage) {
    return slug;
  }

  // Slug already exists, append a counter to make it unique
  let counter = 1;
  while (true) {
    let newSlug = `${slug}-${counter}`;
    existingPackage = await Package.findOne({ slug: newSlug });
    if (!existingPackage) {
      return newSlug;
    }
    counter++;
  }
}
