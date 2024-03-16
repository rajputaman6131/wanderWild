import Place from "@/schemaModels/place";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    await connectToDB();

    const tourPlace = await Place.findOne({ slug });

    return new NextResponse(JSON.stringify(tourPlace, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
