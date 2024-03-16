import Contact from "@/schemaModels/contact";
import { getAuthSession } from "@/utils/auth";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.nextUrl);

  const page = parseInt(searchParams.get("page")) || 1;

  const LIMIT = parseInt(searchParams.get("limit")) || 5;

  const query = {
    skip: LIMIT * (page - 1),
    limit: LIMIT,
  };

  try {
    const session = await getAuthSession();

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }
    await connectToDB();

    const [contacts, count] = await Promise.all([
      Contact.find(query).lean(),
      Contact.countDocuments(query),
    ]);

    return new NextResponse(
      JSON.stringify({ contacts, count }, { status: 200 })
    );
  } catch (err) {
    console.log(err);
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
