import Contact from "@/schemaModels/contact";
import { getAuthSession } from "@/utils/auth";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.nextUrl);

  const page = parseInt(searchParams.get("page")) || 1; // Convert page parameter to number
  const keyword = searchParams.get("keyword");

  const POSTS_PER_PAGE = 6;

  const skip = POSTS_PER_PAGE * (page - 1); // Calculate skip value

  const query = {
    ...(keyword && { name: { $regex: keyword, $options: "i" } }),
  };

  try {
    await connectToDB();
    const session = await getAuthSession();

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }

    const contacts = await Contact.find(query)
      .skip(skip)
      .limit(POSTS_PER_PAGE)
      .sort({ createdAt: -1 })
      .lean();

    const count = await Contact.countDocuments(query);

    return new NextResponse(
      JSON.stringify({ contacts, count, currentPage: page }, { status: 200 })
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
    // const session = await getAuthSession();

    // if (!session) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    //   );
    // }
    await connectToDB();

    const body = await req.json();
    const contact = await Contact.create({
      ...body,
    });
    return new NextResponse(JSON.stringify(contact, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
