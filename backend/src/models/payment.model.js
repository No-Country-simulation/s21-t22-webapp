import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true }, // Monto total a pagar
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    }, // Estado del pago
    paymentMethod: {
      type: String,
      enum: ["credit_card", "debit_card", "paypal", "cash"],
      required: true,
    }, // Método de pago
    transactionDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
