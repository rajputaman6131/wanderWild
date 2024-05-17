import { Schema, model, models } from "mongoose";
import Package from "./package";

const BookingSchema = new Schema(
  {
    packageType: { type: String, enum: ["travel", "activity"], required: true },
    packageId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Package,
    },
    email: { type: String, required: true },
    packageDate: { type: Date, required: true },
    seatsBooked: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    }, // Booking status
    paymentStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    }, // Payment status
    transactionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = models.Booking || model("Booking", BookingSchema);

export default Booking;
