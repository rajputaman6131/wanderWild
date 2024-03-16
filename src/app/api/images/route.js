import Image from "@/schemaModels/images";
import { getAuthSession } from "@/utils/auth";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.nextUrl);

  const page = parseInt(searchParams.get("page")) || 1;
  const category = searchParams.get("category");

  const POSTS_PER_PAGE = 12;

  const skip = POSTS_PER_PAGE * (page - 1);

  const query = {
    ...(category && { category }),
  };

  try {
    await connectToDB();

    const images = await Image.find(query)
      .skip(skip)
      .limit(POSTS_PER_PAGE)
      .lean();

    const count = await Image.countDocuments(query);

    return new NextResponse(
      JSON.stringify({ images, count, currentPage: page }, { status: 200 })
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
    await connectToDB();

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }

    const body = await req.json();
    const images = await Promise.all(
      body.images.map(async (imageData) => {
        // Assuming imageData contains the necessary data for each image
        const image = await Image.create({
          ...imageData,
        });
        return image;
      })
    );

    return new NextResponse(JSON.stringify(images, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
