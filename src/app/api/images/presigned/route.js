import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { promisify } from "util";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.region;
const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;
const bucket = process.env.bucket;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const generateRandomBytes = promisify(randomBytes);

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.nextUrl);
    const images = parseInt(searchParams.get("images")) || 1;
    const numImages = parseInt(images) || 1;
    const session = await getAuthSession();

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated" }, { status: 401 })
      );
    }

    if (numImages > 10) {
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong" }, { status: 500 })
      );
    }

    const urls = [];
    for (let i = 0; i < numImages; i++) {
      const url = await generateUploadUrl();
      urls.push(url);
    }

    return new NextResponse(JSON.stringify({ urls }, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify(
        { message: "Something went wrong!", error },
        { status: 500 }
      )
    );
  }
};

const generateUploadUrl = async () => {
  const rawBytes = await generateRandomBytes(16);
  const imageName = rawBytes.toString("hex") + "/1";

  const params = {
    Bucket: bucket,
    Key: imageName,
  };

  try {
    const command = new PutObjectCommand(params);
    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 600,
    });

    return uploadUrl;
  } catch (error) {
    console.error("Error generating upload URL:", error);
    throw error;
  }
};
