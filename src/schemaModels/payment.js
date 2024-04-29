import { Schema, model, models } from "mongoose";

const PaymentSchema = new Schema(
  {
    package: {
      type: Schema.Types.ObjectId,
      ref: "Package",
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    userEmail: {
      type: String,
    },
  },
  { timestamps: true }
);

const Payment = models.Payment || model("Payment", PaymentSchema);

export default Payment;
