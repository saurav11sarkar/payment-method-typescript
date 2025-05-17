import mongoose from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcryptjs";
import config from "../../config";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    accountType: {
      type: String,
      enum: ["savings", "current"],
      default: "savings",
    },
    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    balance: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
      default: "01717171717",
    },
    address: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, Number(config.round));
  next();
});
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
