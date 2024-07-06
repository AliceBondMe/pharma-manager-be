import mongoose, { Schema } from "mongoose";

const user = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: String,
  },
  { versionKey: false }
);

const User = mongoose.model("user", user);

export default User;
