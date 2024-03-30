import Comment from "@/schemaModels/comment";
import { getAuthSession } from "@/utils/auth";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

// GET ALL COMMENTS OF A POST
export const GET = async (req) => {
  const { searchParams } = new URL(req.nextUrl);
  const postSlug = searchParams.get("postSlug");

  try {
    await connectToDB();

    const comments = await Comment.find({ postSlug })
      .sort({ createdAt: -1 })
      .lean();
    return new NextResponse(JSON.stringify(comments, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A COMMENT
export const POST = async (req) => {
  try {
    await connectToDB();
    const session = await getAuthSession();

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }

    const body = await req.json();
    const comment = await Comment.create({
      ...body,
      userEmail: session.user.email,
    });
    return new NextResponse(JSON.stringify(comment, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
