import Place from "@/schemaModels/place";
import { getAuthSession } from "@/utils/auth";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.nextUrl);

  const page = searchParams.get("page");
  const POST_PER_PAGE = parseInt(searchParams.get("limit")) || 5;

  let query = {};

  if (page && page.toLowerCase() !== "all") {
    const pageNumber = parseInt(page) || 1;
    const skip = POST_PER_PAGE * (pageNumber - 1);
    query = { skip, limit: POST_PER_PAGE };
  }

  try {
    await connectToDB();

    const [places, count] = await Promise.all([
      Place.find(query).lean(),
      Place.countDocuments(),
    ]);

    return new NextResponse(JSON.stringify({ places, count }, { status: 200 }));
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
    const tourPlace = await Place.create({
      ...body,
      slug: await generateUniqueSlug(body.placeName),
    });

    return new NextResponse(JSON.stringify(tourPlace, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// Function to generate a unique slug
async function generateUniqueSlug(title) {
  // Convert title to a slug (e.g., "My Awesome Place" => "my-awesome-place")
  await connectToDB();

  let slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  // Check if a document with this slug already exists in the collection
  let existingPlace = await Place.findOne({ slug: slug });

  // If no document found with the same slug, it's unique
  if (!existingPlace) {
    return slug;
  }

  // Slug already exists, append a counter to make it unique
  let counter = 1;
  while (true) {
    let newSlug = `${slug}-${counter}`;
    existingPlace = await Place.findOne({ slug: newSlug });
    if (!existingPlace) {
      return newSlug;
    }
    counter++;
  }
}
