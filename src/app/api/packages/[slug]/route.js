import Package from "@/schemaModels/package";
import { getAuthSession } from "@/utils/auth";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    await connectToDB();

    const tourPackage = await Package.findOne({ slug });

    return new NextResponse(JSON.stringify(tourPackage, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

export const PUT = async (req, { params }) => {
  try {
    await connectToDB();

    const { slug } = params;
    const newData = await req.json();

    const session = await getAuthSession();

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }

    const updatedPackage = await Package.findOneAndUpdate(
      { slug },
      newData,
      { new: true } // Return the updated document
    );

    if (!updatedPackage) {
      return new NextResponse(
        JSON.stringify({ message: "Package not found" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(JSON.stringify(updatedPackage), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
