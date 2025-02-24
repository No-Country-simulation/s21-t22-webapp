import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add your name"] },
    lastname: { type: String, required: [true, "Please add your lastname"] },
    phone: {
      type: String,
      required: [true, "Please add your phone"],
      unique: true,
    },
    dni: {
      type: String,
      required: [true, "Please add your dni"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
    },
    password: { type: String, required: [true, "Please add your password"] },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    miles_balace: { type: Number, default: 0}
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
