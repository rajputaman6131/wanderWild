import Booking from "@/schemaModels/booking";
import Package from "@/schemaModels/package";
import { getAuthSession } from "@/utils/auth";
import { connectToDB } from "@/utils/database";
import axios from "axios";
import { NextResponse } from "next/server";
import sha256 from "sha256";

export const GET = async (req, { params }) => {
  try {
    const { transactionId } = params;

    const session = await getAuthSession();

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }
    await connectToDB();

    const merchantId = process.env.MERCHANT_ID;
    const key = process.env.SALT_KEY;
    const keyIndex = process.env.KEY_INDEX;
    const endpoint = `/pg/v1/status/${merchantId}/${transactionId}`;

    const xVerify = sha256(endpoint + key) + "###" + keyIndex;

    const options = {
      method: "get",
      url: `${process.env.PAYMENT_URL}${endpoint}`,
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        "X-MERCHANT-ID": merchantId,
        "X-VERIFY": xVerify,
      },
    };

    const response = await axios.request(options);

    const booking = await Booking.findOne({ transactionId });

    if (
      response.data.data.state === "COMPLETED" &&
      booking.status !== "confirmed"
    ) {
      booking.status = "confirmed";
      booking.paymentStatus = "completed";
      await booking.save();

      const pkg = await Package.findById(booking.packageId);

      if (!pkg) {
        return new NextResponse(
          JSON.stringify({ message: "Package not found" }, { status: 404 })
        );
      }
      const providedDate = new Date(booking.packageDate).toLocaleDateString();

      const availabilityEntry = pkg.availability.find((entry) => {
        const entryDate = new Date(entry.date).toLocaleDateString();
        return entryDate === providedDate;
      });

      if (!availabilityEntry) {
        return new NextResponse(
          JSON.stringify(
            { message: "Availability entry not found for the provided date" },
            { status: 404 }
          )
        );
      }

      // Check if there are enough available seats to decrement
      if (availabilityEntry.availableSeats < 1) {
        return new NextResponse(
          JSON.stringify(
            { message: "Not enough available seats to book!" },
            { status: 500 }
          )
        );
      }

      // Decrement available seats
      availabilityEntry.availableSeats -= booking.seatsBooked;

      // Save the updated package
      await pkg.save();
    }

    return new NextResponse(
      JSON.stringify(response.data, {
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
