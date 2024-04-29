import Booking from "@/schemaModels/booking";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.nextUrl);

  const page = parseInt(searchParams.get("page")) || 1; // Convert page parameter to number
  const type = searchParams.get("type");
  const packageId = searchParams.get("packageId");
  const keyword = searchParams.get("keyword");

  const POSTS_PER_PAGE = 10;

  const skip = POSTS_PER_PAGE * (page - 1); // Calculate skip value

  const query = {
    ...(type && { packageType: type }),
    ...(packageId && { packageId }),
    ...(keyword && { email: { $regex: keyword, $options: "i" } }),
  };

  try {
    await connectToDB();

    const bookings = await Booking.find(query)
      .skip(skip)
      .limit(POSTS_PER_PAGE)
      .sort({ createdAt: -1 })
      .lean();

    const count = await Booking.countDocuments(query);

    return new NextResponse(
      JSON.stringify({ bookings, count, currentPage: page }, { status: 200 })
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
