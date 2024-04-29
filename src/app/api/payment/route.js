import axios from "axios";
import { NextResponse } from "next/server";
import sha256 from "sha256";
import { getAuthSession } from "@/utils/auth";
import { connectToDB } from "@/utils/database";
import Booking from "@/schemaModels/booking";

const generateTransactionId = () => {
  const timestamps = Date.now();
  const randomNum = Math.floor(Math.random() * 1000000);
  const prefix = "T";
  const transactionId = `${prefix}${timestamps}${randomNum}`;
  return transactionId;
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
    const { amount } = body;

    const merchantTransactionId = generateTransactionId();
    const endpoint = "/pg/v1/pay";

    await Booking.create({
      ...body,
      status: "pending",
      paymentStatus: "pending",
      email: session.user.email,
      transactionId: merchantTransactionId,
    });

    const data = {
      merchantId: process.env.MERCHANT_ID,
      merchantTransactionId,
      merchantUserId: session.user.email,
      amount: parseFloat(amount || 0) * 100,
      redirectUrl: `${process.env.BASE_URL}/payment/status/${merchantTransactionId}`,
      redirectMode: "REDIRECT",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const key = process.env.SALT_KEY;
    const keyIndex = process.env.KEY_INDEX;

    const bufferObject = Buffer.from(JSON.stringify(data), "utf8");
    const base64Payload = bufferObject.toString("base64");
    const xVerify = sha256(base64Payload + endpoint + key) + "###" + keyIndex;

    const options = {
      method: "post",
      url: `${process.env.PAYMENT_URL}${endpoint}`,
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
      },
      data: {
        request: base64Payload,
      },
    };

    const response = await axios.request(options);

    return new NextResponse(
      JSON.stringify(response.data.data.instrumentResponse.redirectInfo.url, {
        status: 200,
      })
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
